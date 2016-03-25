(function () {
    'use strict';

    //TODO: разобраться с $sanitize
    angular
        .module('gymio.services')
        .factory('datavalidation', ['$translate', '$sanitize', function ($translate, $sanitize) {
            var loginValidation = function (field) {
                var resultObj = {
                    passed: true,//if filed passed validation
                    errorMsg: '',
                    //processedField: $sanitize(field)
                    processedField: field
                };

                if (field.length < 3) {
                    resultObj.errorMsg = $translate.instant('Login too short');
                    resultObj.passed = false;
                    return resultObj;
                }
                if (field.length > 20) {
                    resultObj.errorMsg = $translate.instant('Login too long');
                    resultObj.passed = false;
                    return resultObj;
                }

                return resultObj;
            };

            var fullNameValidation = function (field) {
                var resultObj = {
                    passed: true,//if filed passed validation
                    errorMsg: '',
                    //processedField: $sanitize(field)
                    processedField: field
                };
                var l = field.split(' ').length;
                if ((l < 2) || (l > 3) || (field.match(/\d/))) {
                    resultObj.errorMsg = $translate.instant('Wrong Full Name');
                    resultObj.passed = false;
                    return resultObj;
                }

                return resultObj;
            };


            var passwordValidation = function (field) {
                var resultObj = {
                    passed: true,//if filed passed validation
                    errorMsg: '',
                    //processedField: $sanitize(field)
                    processedField: field
                };
                if (field.length < 3) {
                    resultObj.errorMsg = $translate.instant('Password too short');
                    resultObj.passed = false;
                    return resultObj;
                }

                return resultObj;
            };

            var phoneValidation = function (field) {
                var resultObj = {
                    passed: true,//if filed passed validation
                    errorMsg: '',
                    processedField: field
                };

                var p = resultObj.processedField;
                p = p.replace('+', '').replace(' ', '').replace('-', '').replace('(', '').replace(')', '');

                if ((!p.match(/^\d+$/)) || (p.length > 12) || (p.length < 10)) {
                    resultObj.errorMsg = $translate.instant('Wrong phone');
                    resultObj.passed = false;
                    return resultObj;
                }
                resultObj.processedField = p.slice(p.length - 10);

                return resultObj;
            };

            var birthDateValidation = function (field) {
                var resultObj = {
                    passed: false,//if filed did not pass validation
                    errorMsg: $translate.instant('Wrong age'),
                    processedField: field
                };

                if (!resultObj.processedField) return resultObj;
                var y = resultObj.processedField.getFullYear();

                var now = (new Date()).getFullYear();

                if (y && (y > 1930) && ((now - y) > 3)) {
                    resultObj.passed = true;
                    resultObj.errorMsg = '';
                }

                return resultObj;
            };


            return {
                loginValidation: loginValidation,
                fullNameValidation: fullNameValidation,
                passwordValidation: passwordValidation,
                phoneValidation: phoneValidation,
                birthDateValidation: birthDateValidation
            };
        }]);
})();
