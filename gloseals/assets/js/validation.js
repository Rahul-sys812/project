

// Form validation utilities
const FormValidation = {
    // Email validation regex
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // Phone validation regex (international)
    phoneRegex: /^[\d\s\-\+\(\)]+$/,
    
    // Name validation regex
    nameRegex: /^[a-zA-Z\s\-'\.]+$/,
    
    // Validate email
    validateEmail: function(email) {
        if (!email || email.trim() === '') {
            return { valid: false, message: 'Email is required' };
        }
        
        if (!this.emailRegex.test(email)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }
        
        return { valid: true, message: '' };
    },
    
    // Validate phone number
    validatePhone: function(phone) {
        if (!phone || phone.trim() === '') {
            return { valid: false, message: 'Phone number is required' };
        }
        
        if (!this.phoneRegex.test(phone)) {
            return { valid: false, message: 'Phone number can only contain digits, spaces, and special characters' };
        }
        
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.length < 10) {
            return { valid: false, message: 'Phone number must be at least 10 digits' };
        }
        
        return { valid: true, message: '' };
    },
    
    // Validate name
    validateName: function(name) {
        if (!name || name.trim() === '') {
            return { valid: false, message: 'Name is required' };
        }
        
        if (name.trim().length < 2) {
            return { valid: false, message: 'Name must be at least 2 characters long' };
        }
        
        if (!this.nameRegex.test(name)) {
            return { valid: false, message: 'Name can only contain letters, spaces, and basic punctuation' };
        }
        
        return { valid: true, message: '' };
    },
    
    // Validate message
    validateMessage: function(message) {
        if (!message || message.trim() === '') {
            return { valid: false, message: 'Message is required' };
        }
        
        if (message.trim().length < 10) {
            return { valid: false, message: 'Message must be at least 10 characters long' };
        }
        
        if (message.trim().length > 1000) {
            return { valid: false, message: 'Message must be less than 1000 characters' };
        }
        
        return { valid: true, message: '' };
    },
    
    // Validate subject
    validateSubject: function(subject) {
        if (subject && subject.trim().length > 0 && subject.trim().length < 3) {
            return { valid: false, message: 'Subject must be at least 3 characters long' };
        }
        
        return { valid: true, message: '' };
    },
    
    // Validate captcha
    validateCaptcha: function(answer) {
        if (!answer || answer.trim() === '') {
            return { valid: false, message: 'Please answer the security question' };
        }
        
        // Simple math captcha (5 + 3 = 8)
        if (answer.trim() !== '8') {
            return { valid: false, message: 'Incorrect answer. Please try again' };
        }
        
        return { valid: true, message: '' };
    },
    
    // Validate checkbox consent
    validateConsent: function(consent) {
        if (!consent) {
            return { valid: false, message: 'You must agree to the terms and conditions' };
        }
        
        return { valid: true, message: '' };
    },
    
    // Show field error
    showFieldError: function(field, message) {
        // Remove existing error
        this.clearFieldError(field);
        
        // Add error styling
        field.addClass('is-invalid');
        
        // Create error message
        const errorDiv = $('<div class="invalid-feedback">' + message + '</div>');
        field.after(errorDiv);
        
        // Shake animation
        field.addClass('shake');
        setTimeout(() => field.removeClass('shake'), 500);
    },
    
    // Clear field error
    clearFieldError: function(field) {
        field.removeClass('is-invalid');
        field.next('.invalid-feedback').remove();
    },
    
    // Show field success
    showFieldSuccess: function(field) {
        this.clearFieldError(field);
        field.addClass('is-valid');
    },
    
    // Clear all field states
    clearAllFieldStates: function(form) {
        form.find('.form-control').removeClass('is-valid is-invalid');
        form.find('.invalid-feedback').remove();
    }
};

// Real-time validation (only if jQuery is available)
if (window.jQuery) {
$(document).ready(function() {
    // Contact form real-time validation
    $('#contactName').on('blur', function() {
        const validation = FormValidation.validateName($(this).val());
        if (validation.valid) {
            FormValidation.showFieldSuccess($(this));
        } else {
            FormValidation.showFieldError($(this), validation.message);
        }
    });
    
    $('#contactEmail').on('blur', function() {
        const validation = FormValidation.validateEmail($(this).val());
        if (validation.valid) {
            FormValidation.showFieldSuccess($(this));
        } else {
            FormValidation.showFieldError($(this), validation.message);
        }
    });
    
    $('#contactPhone').on('blur', function() {
        const validation = FormValidation.validatePhone($(this).val());
        if (validation.valid) {
            FormValidation.showFieldSuccess($(this));
        } else {
            FormValidation.showFieldError($(this), validation.message);
        }
    });
    
    $('#contactSubject').on('blur', function() {
        const validation = FormValidation.validateSubject($(this).val());
        if (validation.valid) {
            FormValidation.showFieldSuccess($(this));
        } else {
            FormValidation.showFieldError($(this), validation.message);
        }
    });
    
    $('#contactMessage').on('blur', function() {
        const validation = FormValidation.validateMessage($(this).val());
        if (validation.valid) {
            FormValidation.showFieldSuccess($(this));
        } else {
            FormValidation.showFieldError($(this), validation.message);
        }
    });
    
    // Inquiry form real-time validation
    $('#inquiryName').on('blur', function() {
        const validation = FormValidation.validateName($(this).val());
        if (validation.valid) {
            FormValidation.showFieldSuccess($(this));
        } else {
            FormValidation.showFieldError($(this), validation.message);
        }
    });
    
    $('#inquiryEmail').on('blur', function() {
        const validation = FormValidation.validateEmail($(this).val());
        if (validation.valid) {
            FormValidation.showFieldSuccess($(this));
        } else {
            FormValidation.showFieldError($(this), validation.message);
        }
    });
    
    $('#inquiryPhone').on('blur', function() {
        const validation = FormValidation.validatePhone($(this).val());
        if (validation.valid) {
            FormValidation.showFieldSuccess($(this));
        } else {
            FormValidation.showFieldError($(this), validation.message);
        }
    });
    
    $('#captchaAnswer').on('blur', function() {
        const validation = FormValidation.validateCaptcha($(this).val());
        if (validation.valid) {
            FormValidation.showFieldSuccess($(this));
        } else {
            FormValidation.showFieldError($(this), validation.message);
        }
    });
    
    // Clear validation on input
    $('.form-control').on('input', function() {
        if ($(this).hasClass('is-invalid')) {
            FormValidation.clearFieldError($(this));
        }
    });
});
}



// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = shakeStyles;
document.head.appendChild(styleSheet);

// Export for global use
window.FormValidation = FormValidation;
