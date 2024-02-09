export enum AppErrorsEnum {
  UNKNOWN_ERROR = 'Something went wrong, Please try again later',
  FORM_INFO = "Please fill all required fields!",
  LOGIN_SUCCESS = 'Logged in successfully!',
  PASSWORD_RESET_SUCCESS = 'Password reset sucessful. Please login with your new password',
  SELECT_MIN_ROLE_PERMISSION = "Please select role permission",
  COVER_LETTER_UPDATE = 'Cover letter updated successfully',
  COVER_LETTER_CREATED = 'Cover letter moved to defense package successfully',
  DOCUMENTS_MOVE_TO_DEFENCEPACKAGE_PLURAL = 'Documents moved to defense package successfully',
  DOCUMENTS_MOVE_TO_DEFENCEPACKAGE_SINGULAR = 'Document moved to defense package successfully',
  CLAIM_NUMBER_REQUIRED = "Please enter claim number to update",
  CLAIM_NUMBER_UPDATE = "Case Claim Number Updated Successfully",
  DOCUMENT_IN_DEFENSE_PACKAGE = "Cannot delete this document as it is currently being used in a defense package"
}
