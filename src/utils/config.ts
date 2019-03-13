declare function require(moduleName: string): any;

if (process.env.NODE_ENV !== 'production') {
  const dotenv: any = require('dotenv');

  dotenv.config();
}

export const API_URL = process.env.REACT_APP_API_URL;

export const COGNITO_MANDATORY_SIGN_IN = process.env.REACT_APP_COGNITO_MANDATORY_SIGN_IN;
export const COGNITO_REGION = process.env.REACT_APP_COGNITO_REGION;
export const COGNITO_USER_POOL_ID = process.env.REACT_APP_COGNITO_USER_POOL_ID;
export const COGNITO_IDENTITY_POOL_ID = process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID;
export const COGNITO_APP_ID = process.env.REACT_APP_COGNITO_APP_ID;

export const GOOGLE_APP_ID = process.env.REACT_APP_GOOGLE_APP_ID;
export const GOOGLE_SCRIPT_SOURCE = process.env.REACT_APP_GOOGLE_SCRIPT_SOURCE;
export const GOOGLE_SCOPE = process.env.REACT_APP_GOOGLE_SCOPE;

export const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
export const FB_VERSION = process.env.REACT_APP_FB_VERSION;
export const FB_XFBML = process.env.REACT_APP_FB_XFBML;
export const FB_SCRIPT_SOURCE = process.env.REACT_APP_FB_SCRIPT_SOURCE;
export const FB_SCOPE = process.env.REACT_APP_FB_SCOPE;

export const INSTAGRAM_APP_ID = process.env.REACT_APP_INSTAGRAM_APP_ID;
export const INSTAGRAM_APP_SECRET = process.env.REACT_APP_INSTAGRAM_APP_SECRET;
export const INSTAGRAM_POST_SOURCE = process.env.REACT_APP_INSTAGRAM_POST_SOURCE;
export const INSTAGRAM_SCOPE = process.env.REACT_APP_INSTAGRAM_SCOPE;
export const INSTAGRAM_LOGIN_URL = process.env.REACT_APP_INSTAGRAM_LOGIN_URL as string;