import express from 'express';
import mongoose from 'mongoose';
import { Contact } from '../models/Contact.js';
import { sendReplyEmail } from '../config/emailService.js';

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Submit a new contact message and store in MongoDB
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is currently unavailable. Please verify MongoDB is running or try again shortly.',
      });
    }

    const { name, email, subject, message } = req.body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (name, email, subject, message).',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long.',
      });
    }

    // Capture request metadata safely
    const ipAddress =
      req.headers['x-forwarded-for'] ||
      req.socket?.remoteAddress ||
      '';
    const userAgent = req.headers['user-agent'] || '';

    // Create and save new contact submission in MongoDB
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      ipAddress: typeof ipAddress === 'string' ? ipAddress : ipAddress[0] || '',
      userAgent,
    });

    const savedContact = await newContact.save();

    console.log(`📩 New message saved to MongoDB [ID: ${savedContact._id}] from: ${savedContact.name} <${savedContact.email}>`);

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent and stored successfully! I will get back to you shortly.',
      data: {
        id: savedContact._id,
        createdAt: savedContact.createdAt,
      },
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    return res.status(500).json({
      success: false,
      message: 'An unexpected server error occurred while processing your message. Please try again later.',
    });
  }
});

/**
 * @route   GET /api/contact
 * @desc    Get all submitted contact messages (sorted newest first)
 * @access  Public / Admin
 */
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected.',
      });
    }

    const messages = await Contact.find().sort({ createdAt: -1 }).limit(100);
    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages.',
    });
  }
});

/**
 * @route   PATCH /api/contact/:id/status
 * @desc    Update status of a contact message (unread, read, replied, archived)
 * @access  Public / Admin
 */
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['unread', 'read', 'replied', 'archived'];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowed.join(', ')}`,
      });
    }

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update message status',
    });
  }
});

/**
 * @route   POST /api/contact/:id/reply
 * @desc    Send a reply email directly to the contact sender and record reply history
 * @access  Public / Admin
 */
router.post('/:id/reply', async (req, res) => {
  try {
    const { id } = req.params;
    const { replySubject, replyMessage, senderEmail } = req.body;

    if (!replyMessage || !replyMessage.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Reply message text is required.',
      });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found in database.',
      });
    }

    const finalSubject = (replySubject && replySubject.trim()) || `Re: ${contact.subject}`;
    
    // Send email via emailService
    const emailResult = await sendReplyEmail({
      to: contact.email,
      recipientName: contact.name,
      subject: finalSubject,
      message: replyMessage.trim(),
      originalMessage: contact.message,
      originalSubject: contact.subject,
    });

    // Update status to 'replied' and push to replies array
    contact.status = 'replied';
    if (!contact.replies) contact.replies = [];
    contact.replies.push({
      replySubject: finalSubject,
      replyMessage: replyMessage.trim(),
      senderEmail: senderEmail || emailResult.senderEmail,
      sentAt: new Date(),
      messageId: emailResult.messageId || '',
    });

    await contact.save();

    console.log(`✅ Direct reply sent to ${contact.email} for inquiry "${contact.subject}"`);

    return res.status(200).json({
      success: true,
      message: `Reply email successfully sent directly to ${contact.name} (${contact.email})!`,
      data: contact,
    });
  } catch (error) {
    console.error('Error sending reply email:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send reply email.',
    });
  }
});

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete a message by ID
 * @access  Public / Admin
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete message',
    });
  }
});

export default router;

