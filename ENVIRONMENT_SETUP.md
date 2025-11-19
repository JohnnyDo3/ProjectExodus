# Environment Variables Setup Guide

This guide explains all environment variables needed for Project Exodus to function properly.

## 🚨 Required Variables (Critical)

These variables **MUST** be set for the application to work:

### Database
```bash
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```
- **Purpose**: PostgreSQL database connection
- **Get it from**: [Neon](https://neon.tech), [Supabase](https://supabase.com), or any PostgreSQL provider
- **Your current**: ✅ Already configured

### Authentication Secret
```bash
AUTH_SECRET="your-super-secret-key-here"
```
- **Purpose**: Encrypts session tokens and cookies for NextAuth.js
- **Generate with**: `openssl rand -base64 32`
- **Security**: NEVER commit this to git, use different values for dev/prod
- **Your current**: ✅ Already configured

### Base URL
```bash
AUTH_URL="https://yourdomain.com"
# For development:
# AUTH_URL="http://localhost:3000"
```
- **Purpose**: Base URL for authentication callbacks
- **Development**: `http://localhost:3000`
- **Production**: Your actual domain (e.g., `https://project-exodus-seven.vercel.app`)
- **Your current**: ✅ Set to localhost (update for production)

---

## ⚙️ Feature-Specific Variables (Optional but Recommended)

### Image Uploads (Cloudinary)

**Status**: ❌ Not configured - Image uploads will fail

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="your-api-secret"
```

**What breaks without it**:
- Product image uploads
- User avatar uploads
- Article image uploads

**Get it from**: [Cloudinary](https://cloudinary.com)
1. Sign up for free account
2. Dashboard → Settings → Account → Cloud name, API Key, API Secret
3. Free tier: 25GB storage, 25GB/month bandwidth

**Alternative**: You can use local file storage or disable image uploads temporarily

---

### Email Service (Resend)

**Status**: ❌ Not configured - Emails will fail

```bash
RESEND_API_KEY="re_your_api_key_here"
RESEND_FROM_EMAIL="noreply@yoursite.com"
```

**What breaks without it**:
- Password reset emails
- Welcome emails
- Newsletter subscriptions
- Contact form submissions

**Get it from**: [Resend](https://resend.com)
1. Sign up for free account
2. Add and verify your domain
3. Create API key
4. Free tier: 100 emails/day, 3,000/month

**Alternative**: Comment out email functionality until needed

---

### Social Login (OAuth)

**Status**: ❌ Not configured - Social login buttons will error

#### Google OAuth
```bash
GOOGLE_CLIENT_ID="123456789-abcdefg.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-secret-here"
```

**Get it from**: [Google Cloud Console](https://console.cloud.google.com)
1. Create new project
2. APIs & Services → OAuth consent screen
3. Create OAuth 2.0 Client ID
4. Add authorized redirect: `https://yourdomain.com/api/auth/callback/google`

#### GitHub OAuth
```bash
GITHUB_CLIENT_ID="your-client-id"
GITHUB_CLIENT_SECRET="your-client-secret"
```

**Get it from**: [GitHub Developer Settings](https://github.com/settings/developers)
1. New OAuth App
2. Homepage URL: `https://yourdomain.com`
3. Callback URL: `https://yourdomain.com/api/auth/callback/github`

**Note**: Social login is optional. Email/password auth works without these.

---

## 📋 Complete .env Template

Here's what your `.env` file should look like:

```bash
# ==========================================
# REQUIRED - Application won't work without these
# ==========================================

# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Authentication
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_URL="http://localhost:3000"  # Change for production

# ==========================================
# OPTIONAL - Feature-specific
# ==========================================

# Cloudinary (Image Uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Resend (Email Service)
RESEND_API_KEY=""
RESEND_FROM_EMAIL=""

# Google OAuth (Social Login)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# GitHub OAuth (Social Login)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

---

## 🚀 Quick Start Checklist

### Minimum to run locally:
- [x] DATABASE_URL
- [x] AUTH_SECRET
- [x] AUTH_URL

### For full functionality:
- [ ] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] RESEND_API_KEY
- [ ] RESEND_FROM_EMAIL

### For social login:
- [ ] GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET
- [ ] GITHUB_CLIENT_ID + GITHUB_CLIENT_SECRET

---

## 🔒 Security Best Practices

1. **Never commit .env to git** - It's in `.gitignore` by default
2. **Use different secrets** for development and production
3. **Rotate secrets regularly** in production
4. **Generate strong secrets**: `openssl rand -base64 32`
5. **Set environment variables in Vercel**:
   - Go to your project settings
   - Environment Variables tab
   - Add each variable
   - Select environments (Production, Preview, Development)

---

## 🐛 Troubleshooting

### "MissingSecret" error
**Cause**: AUTH_SECRET not set or not loaded
**Fix**:
1. Ensure AUTH_SECRET is in .env
2. Restart dev server: `npm run dev`
3. In Vercel: Add AUTH_SECRET in project settings → Environment Variables

### "Invalid client credentials" (OAuth errors)
**Cause**: OAuth credentials not set or incorrect
**Fix**:
1. Verify CLIENT_ID and CLIENT_SECRET in .env
2. Check callback URL in OAuth provider settings
3. Make sure URLs match exactly (http vs https)

### Image uploads fail
**Cause**: Cloudinary not configured
**Fix**: Add Cloudinary credentials or disable image upload features

### Emails not sending
**Cause**: Resend not configured
**Fix**: Add Resend API key or use console.log for development

---

## 📝 Notes

- **Development**: You can run the app with just DATABASE_URL, AUTH_SECRET, and AUTH_URL
- **Production**: All features require their respective environment variables
- **Vercel**: Remember to set environment variables in your Vercel project settings
- **Local testing**: Copy `.env.example` to `.env` and fill in your values

---

## 🆘 Need Help?

- **Neon Database**: https://neon.tech/docs
- **NextAuth.js**: https://authjs.dev/getting-started
- **Cloudinary**: https://cloudinary.com/documentation
- **Resend**: https://resend.com/docs
- **Google OAuth**: https://developers.google.com/identity/protocols/oauth2
- **GitHub OAuth**: https://docs.github.com/en/apps/oauth-apps
