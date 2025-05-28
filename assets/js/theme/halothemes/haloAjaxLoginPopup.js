import nod from '../common/nod';
import forms from '../common/models/forms';
import { classifyForm, Validators } from '../common/utils/form-utils';

export default function() {
    const $loginForm = classifyForm('.login-form-sidebar form');

    if ($loginForm.length > 0) {
        registerLoginValidation($loginForm);
    }

    function registerLoginValidation($loginForm) {
        const loginModel = forms;

        const loginValidator = nod({
            submit: $loginForm.find('button'),
        });

        loginValidator.add([{
            selector: $loginForm.find('input[type="email"]'),
            validate: (cb, val) => {
                const result = loginModel.email(val);
                cb(result);
            },
            errorMessage: 'Please use a valid email address, such as user@example.com.',
        }, {
            selector: $loginForm.find('input[type="password"]'),
            validate: (cb, val) => {
                const result = loginModel.password(val);
                cb(result);
            },
            errorMessage: 'You must enter a password.',
        }, ]);

        $loginForm.on('click', 'button', event => {
            event.preventDefault();
            loginValidator.performCheck();

            if (loginValidator.areAll('valid')) {
                var formData = new FormData($loginForm[0]),
                    xhr = new XMLHttpRequest(),
                    urlSuccess1 = 'account.php',
                    urlSuccess2 = 'cart.php',
                    urlError = 'login.php';

                $loginForm.parents('.halo-sidebar-wrapper').find('.note').remove();
                $loginForm.parents('.login-form-sidebar').addClass('is-loading');

                $.ajax({
                    type: 'POST',
                    url: '/login.php?action=check_login',
                    data: formData,
                    processData: false,
                    contentType: false,
                    xhr: function() {
                        return xhr;
                    },
                    success: function() {
                        $loginForm.parents('.login-form-sidebar').removeClass('is-loading');

                        var url = xhr.responseURL;
                        
                        if(url.indexOf(urlSuccess1) != -1 || url.indexOf(urlSuccess2) != -1){
                            location.reload();
                        } else if(url.indexOf(urlError) != -1){
                            $loginForm.parents('.halo-sidebar-wrapper').prepend('<div class="note">\
                                <div class="alertBox alertBox--error">\
                                    <div class="alertBox-column alertBox-icon">\
                                        <svg class="icon"><use href="#icon-error"></use></svg>\
                                    </div>\
                                    <p class="alertBox-column alertBox-message">\
                                        <span id="alertBox-message-text">Your email address or password is incorrect. Please try again.</span>\
                                    </p>\
                                </div>\
                            </div>');
                        } else{
                            location.reload();
                        }
                    }
                });
                
                return;
            }
        });
    }
}
