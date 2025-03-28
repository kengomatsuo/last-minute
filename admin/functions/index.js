/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

/**
 * Firebase Cloud Functions for managing custom claims
 *
 * This module provides HTTP callable functions to set isAdmin and isTutor
 * custom claims for Firebase Authentication users based on their email.
 */

const { initializeApp } = require('firebase-admin/app')
const { getAuth } = require('firebase-admin/auth')
const { onCall, HttpsError } = require('firebase-functions/v2/https')
const { defineString } = require('firebase-functions/params')
const {
    log,
    info,
    debug,
    warn,
    error,
    write,
  } = require("firebase-functions/logger");
const { getFirestore, FieldValue } = require('firebase-admin/firestore')
require("firebase-functions/logger/compat");

// Initialize Firebase Admin SDK
initializeApp()

// Environment configuration parameter
const ENV = defineString('NODE_ENV', { default: 'development' })

/**
 * Set isAdmin custom claim for a user by email
 *
 * @param {Object} data - The function payload
 * @param {string} data.email - Email address of the user to update
 * @param {boolean} data.isAdmin - Value to set for isAdmin claim
 * @returns {Object} - Status message and user details
 */
exports.setAdminClaim = onCall(
  {
    enforceAppCheck: false,
    cors: true,
  },
  async request => {
    const { email, isAdmin } = request.data
    const auth = getAuth()
    const db = getFirestore()

    // Check if the caller is authorized to set admin privileges
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'The function must be called while authenticated.'
      )
    }

    // Check if the requester has admin privileges
    const { uid } = request.auth
    const requestingUserRecord = await auth.getUser(uid)
    const requestingUserCustomClaims = requestingUserRecord.customClaims || {}

    if (!requestingUserCustomClaims.isAdmin) {
      throw new HttpsError(
        'permission-denied',
        'Only administrators can modify admin claims.'
      )
    }

    try {
      // Get user by email
      const userRecord = await auth.getUserByEmail(email)

      // Get current custom claims and update isAdmin claim
      const customClaims = userRecord.customClaims || {}
      
      // Check if the update is necessary
      if (customClaims.isAdmin === Boolean(isAdmin)) {
        throw new HttpsError(
          "failed-precondition",
          `User is already ${isAdmin ? "an admin" : "not an admin"}.`
        );
      }

      // Update authentication custom claims
      customClaims.isAdmin = Boolean(isAdmin);
      await auth.setCustomUserClaims(userRecord.uid, customClaims);

      // Update Firestore user document
      await db.collection("users").doc(userRecord.uid).set(
        { isAdmin: Boolean(isAdmin) },
        { merge: true }
      );

      // Return success result
      return {
        status: 'success',
        message: `Successfully ${
          isAdmin ? 'added' : 'removed'
        } admin claim for ${email}`,
        user: {
          email: userRecord.email,
          uid: userRecord.uid,
          customClaims,
        },
      }
    } catch (error) {
      console.error('Error setting admin claim:', error)
      throw new HttpsError(
        'internal',
        `Failed to set admin claim: ${error.message}`
      )
    }
  }
)

/**
 * Set isTutor custom claim for a user by email
 *
 * @param {Object} data - The function payload
 * @param {string} data.email - Email address of the user to update
 * @param {boolean} data.isTutor - Value to set for isTutor claim
 * @returns {Object} - Status message and user details
 */
exports.setTutorClaim = onCall(
  {
    enforceAppCheck: false,
    cors: true,
  },
  async request => {
    const { email, isTutor } = request.data
    const auth = getAuth()
    const db = getFirestore()

    // log request
    console.log('setTutorClaim request:', request)
    debug('setTutorClaim request:', request)
    // Check if the caller is authenticated
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'The function must be called while authenticated.'
      )
    }

    // Check if the requester has admin privileges
    const { uid } = request.auth
    const requestingUserRecord = await auth.getUser(uid)
    const requestingUserCustomClaims = requestingUserRecord.customClaims || {}

    if (!requestingUserCustomClaims.isAdmin) {
      throw new HttpsError(
        'permission-denied',
        'Only administrators can modify tutor claims.'
      )
    }

    try {
      // Get target user by email
      const userRecord = await auth.getUserByEmail(email);
      const customClaims = userRecord.customClaims || {};

      // Check if the update is necessary
      if (customClaims.isTutor === Boolean(isTutor)) {
        throw new HttpsError(
          "failed-precondition",
          `User is already ${isTutor ? "a tutor" : "not a tutor"}.`
        );
      }

      // Update authentication custom claims
      customClaims.isTutor = Boolean(isTutor);
      await auth.setCustomUserClaims(userRecord.uid, customClaims);

      // Update Firestore user document
      await db.collection("users").doc(userRecord.uid).set(
        { isTutor: Boolean(isTutor) },
        { merge: true }
      );


    } catch (error) {
      console.error('Error setting tutor claim:', error)
      throw new HttpsError(
        'internal',
        `Failed to set tutor claim: ${error.message}`
      )
    }
  }
)

/**
 * Get all custom claims for a user by email
 * Useful for checking existing claims
 *
 * @param {Object} data - The function payload
 * @param {string} data.email - Email address of the user to query
 * @returns {Object} - User details including custom claims
 */
exports.getUserClaims = onCall(
  {
    enforceAppCheck: true,
    cors: true,
  },
  async request => {
    const { email } = request.data
    const auth = getAuth()

    // Check if the caller is authenticated
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'The function must be called while authenticated.'
      )
    }

    // Check if the requester has admin privileges
    const { uid } = request.auth
    const requestingUserRecord = await auth.getUser(uid)
    const requestingUserCustomClaims = requestingUserRecord.customClaims || {}

    if (!requestingUserCustomClaims.isAdmin) {
      throw new HttpsError(
        'permission-denied',
        'Only administrators can view user claims.'
      )
    }

    try {
      // Get user by email
      const userRecord = await auth.getUserByEmail(email)
      const customClaims = userRecord.customClaims || {}

      // Return user details with claims
      return {
        status: 'success',
        user: {
          email: userRecord.email,
          uid: userRecord.uid,
          customClaims,
        },
      }
    } catch (error) {
      console.error('Error getting user claims:', error)
      throw new HttpsError(
        'internal',
        `Failed to get user claims: ${error.message}`
      )
    }
  }
)

/**
 * Accept a course request, adding display names and initializing chat
 *
 * @param {Object} data - The function payload
 * @param {string} data.requestId - ID of the request to accept
 * @returns {Object} - Status message and course details
 */
exports.acceptCourseRequest = onCall(
  {
    enforceAppCheck: false,
    cors: true,
  },
  async (request) => {
    const { requestId } = request.data
    const auth = getAuth()
    const db = getFirestore()

    // Check if the caller is authenticated
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'The function must be called while authenticated.'
      )
    }

    // Check if the requester has tutor privileges
    const { uid } = request.auth
    const tutorRecord = await auth.getUser(uid)
    const tutorCustomClaims = tutorRecord.customClaims || {}

    if (!tutorCustomClaims.isTutor) {
      throw new HttpsError(
        'permission-denied',
        'Only tutors can accept course requests.'
      )
    }

    try {
      const result = await db.runTransaction(async (transaction) => {
        // Get the request document
        const requestRef = db.collection('requests').doc(requestId)
        const requestDoc = await transaction.get(requestRef)
        
        if (!requestDoc.exists) {
          throw new HttpsError(
            'not-found',
            'The requested course request does not exist.'
          )
        }
        
        const requestData = requestDoc.data()
        
        // Get tutor and tutee display names
        const tuteeRecord = await auth.getUser(requestData.tuteeId)
        const tutorDisplayName = tutorRecord.displayName || 'Unknown Tutor'
        const tuteeDisplayName = tuteeRecord.displayName || 'Unknown Student'
        
        // Create a new course document
        const courseRef = db.collection('courses').doc()
        
        // Prepare course data with display names
        const courseData = {
          ...requestData,
          tutorId: uid,
          tutorDisplayName,
          tuteeDisplayName,
          requestedAt: requestData.createdAt,
          createdAt: FieldValue.serverTimestamp(),
        }
        
        // Set the course document
        transaction.set(courseRef, courseData)
        
        // Create an initial chat message in the subcollection
        const welcomeMessage = {
          senderId: 'system',
          text: 'Course request accepted! You can now chat here.',
          createdAt: FieldValue.serverTimestamp(),
        }
        
        transaction.set(
          courseRef.collection('chat').doc(),
          welcomeMessage
        )
        
        // Delete the request document
        transaction.delete(requestRef)
        
        return {
          courseId: courseRef.id,
          courseData
        }
      })

      // Return success result
      return {
        status: 'success',
        message: 'Successfully accepted course request',
        course: {
          id: result.courseId,
          ...result.courseData,
        },
      }
    } catch (error) {
      console.error('Error accepting course request:', error)
      throw new HttpsError(
        'internal',
        `Failed to accept course request: ${error.message}`
      )
    }
  }
)



