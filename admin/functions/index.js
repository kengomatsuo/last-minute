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
const { getFirestore } = require('firebase-admin/firestore')
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

