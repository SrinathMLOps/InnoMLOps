# Formspree Email Setup for InnoMLOps

## Current Configuration

The contact form is configured to send emails to both:
- **ceo@innomlopssolutions.com**
- **contact@innomlopssolutions.com**

## Setup Instructions

### Step 1: Create Formspree Account
1. Go to https://formspree.io
2. Sign up for a FREE account (50 submissions/month)
3. Verify your email address

### Step 2: Create a New Form
1. Click "New Form" in your Formspree dashboard
2. Name it: "InnoMLOps Contact Form"
3. Add both email addresses to receive notifications:
   - ceo@innomlopssolutions.com
   - contact@innomlopssolutions.com

### Step 3: Get Your Form ID
1. After creating the form, you'll get a Form ID (looks like: `xnnqoqpg`)
2. Copy this ID

### Step 4: Update the Website
1. Open `js/main.js`
2. Find line with: `fetch('https://formspree.io/f/xnnqoqpg'`
3. Replace `xnnqoqpg` with YOUR actual Form ID
4. Save and push to GitHub

### Step 5: Test the Form
1. Wait for GitHub Pages to rebuild (2-3 minutes)
2. Visit your website
3. Fill out the contact form
4. Submit and check both email addresses

## Current Form ID
**Temporary ID**: `xnnqoqpg` (Replace with your own!)

## Form Features
✅ Sends to both email addresses
✅ Includes all form fields
✅ Auto-reply to customer
✅ Subject line with customer name and company
✅ Loading spinner during submission
✅ Success/error messages
✅ Form validation

## Alternative: Use FormSubmit (No Signup Required)

If you prefer not to use Formspree, you can use FormSubmit:

1. Open `js/main.js`
2. Replace the fetch URL with:
   ```javascript
   fetch('https://formsubmit.co/ceo@innomlopssolutions.com', {
   ```
3. Add this hidden field to the form in `index.html`:
   ```html
   <input type="hidden" name="_cc" value="contact@innomlopssolutions.com">
   ```

FormSubmit will send a confirmation email to verify your address on first use.

## Troubleshooting

**Form not sending?**
- Check browser console for errors
- Verify Form ID is correct
- Ensure both emails are verified in Formspree

**Not receiving emails?**
- Check spam folder
- Verify email addresses in Formspree dashboard
- Test with a different email first

**Form shows error?**
- Check internet connection
- Verify Formspree service is online
- Try again in a few minutes

## Support
Contact Formspree support: https://help.formspree.io
