export const CURRENT_VIEWER_REQUEST_TARGET = '/users/current'
export const USERS_REQUEST_TARGET = '/users'
export const USER_DOCUMENTS_TARGET = '/user_documents'
export const USER_DOCUMENTS_ID_TARGET = '/user_documents/:id'
export const CURRENT_VIEWER_ID_REQUEST_TARGET = '/users/:id'
export const CURRENT_VIEWER_CHANGE_PASSWORD_REQUEST_TARGET = '/new_password'
export const CURRENT_VIEWER_RESET_PASSWORD_TARGET = '/users/restore_password'
export const USERS_COLLECTION_SETTINGS_REQUEST_TARGET = '/user_notification_settings'
export const CURRENT_VIEWER_SETTINGS_REQUEST_TARGET = '/user_notification_settings/:id'
export const CURRENT_VIEWER_CALLBACK_REQUEST_TARGET = '/users/callback'

export const CURRENT_VIEWER_CALLBACK_PRIMARY_KEY = [CURRENT_VIEWER_CALLBACK_REQUEST_TARGET, 'users-callback-create']
export const USER_COLLECTION_PRIMARY_KEY = [CURRENT_VIEWER_REQUEST_TARGET, 'users-collection']
export const USER_CREATE_PRIMARY_KEY = [USERS_REQUEST_TARGET, 'users-create']
export const CURRENT_VIEWER_CHANGE_PASSWORD_PRIMARY_KEY = [
  CURRENT_VIEWER_ID_REQUEST_TARGET + CURRENT_VIEWER_CHANGE_PASSWORD_REQUEST_TARGET,
  'users-password-change',
]
export const CURRENT_VIEWER_SETTINGS_PRIMARY_KEY = [CURRENT_VIEWER_SETTINGS_REQUEST_TARGET, 'user-settings']
export const CURRENT_VIEWER_PRIVATE_INFO_PRIMARY_KEY = [
  CURRENT_VIEWER_CHANGE_PASSWORD_REQUEST_TARGET,
  'user-private-info',
]
export const CURRRENT_VIEWER_RESET_PASSWORD_PRIMARY_KEY = [CURRENT_VIEWER_RESET_PASSWORD_TARGET, 'user-reset-password']

export const USER_DOCUMENT_PRIMARY_KEY = [USER_DOCUMENTS_TARGET, 'user-document']
export const USER_DOCUMENT_ID_PRIMARY_KEY = [USER_DOCUMENTS_ID_TARGET, 'user-document-id']

export const PROFILE_URL = '/profile'

export const ROLE_ADMIN = 'ROLE_ADMIN'
export const ROLE_DEALER = 'ROLE_DEALER'
