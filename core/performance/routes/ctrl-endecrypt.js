'use strict';

angular.module('cameoClientPerformance')
.controller('CtrlEndecrypt',
    function($scope, cmCrypt, cmKey, cmUtil) {
        var privKey = [
            '-----BEGIN RSA PRIVATE KEY-----',
            'MIIEowIBAAKCAQEAgwXDsDNL0GZBgJ+Lb5715m/zIARubBG85NMNn5LImc3s02go',
            'rcGJHCQLws+Fo9I7KB9clI3t9l/+CV1MxN2C7gmnf22w0hAyQuKdHM0tdyl+EYLY',
            'VTTXwm2QDDJZOn33z0MJ0fgRzUNLAmyL9qbKIYuXaD0jokYbvOCsR49HNxxsjRU5',
            'jLHrnMsNtX7SZLUsjYloxCX8Vw0SQQVtmcsnriYniztT2nD41gYYAPrDOcsN7/LA',
            '412Fgk0qYOmrQepNqkkB/h9rFfP4mMuxg14O+eSDPcwl8K29JB8VcW8ys+edHvNE',
            'OZsmXEe449c59tocPCIUzLwbJht4yg3485XYVwIDAQABAoIBAFI5Q91H08Qs5954',
            'QWEDOP4sMz9ciI95cjmH2XzS+ODMwlrJev3P/uOSG29eHFf6jvVW+RqhFz0OcLYf',
            'vxWsjYYkuODXTagGUgR3gnGYsXeeqmcC3hBa4Sw65bNBxY1XkDSZtYf3TfSqzl/v',
            'DsbzVNZIa/QWqk4kATQ/Kt6do+uJEPHXDQIpMR1DQ+F9Rri/S69yJHBiwiJlkkkY',
            'vFObjL3Ag/M9P31VgtgeQCR7N7qFtMf4vmNS902N4Tb5GZVRK/oSRaeEXRXO9RGX',
            '9BaBbcopCVpI0YH4P23kQ+svWyVC875+oe4QrLfqEPitpeOqqcT+NQ0drxNZ6jau',
            '0SCehEECgYEA/SXFbwTXKKykM6DDUKJXUZ6uAIWYO3Z17AXFcKBL7npVTZV/QiiB',
            'osVUdfYLg86UD2zqoFvg4o56BJ9qUydA7ZWjL3wH7l6ioEMcISh3LMr3L4fOCInC',
            'u3RiE3fM+kd3cypiKM/o7/FjSEYiSh36lr7Zae7LGjr6ktLxkuKoB8sCgYEAhH+2',
            'LaqfiK/J04c0qJy7vg8wIqn32j212Bw1WRHZDYX+86GShcC+L8l6qCaM3/lyjeNm',
            '5gswLwZRCfCKPveWmCFoBwgUXwY4B+k/yW489CMh/THrt3PnXN/Eqj0JaFkhFPt5',
            'QJTA1c9jQ6IlrvSBn2KkrWLHjCQWtJBs+CufKCUCgYEAoI83ZU3dpbeyQeiiWN9O',
            'oL8TP9N8FaLx8ixK6T9SScSfnCDI4U5Nws6D3nmbHhOFRy9etSzxOuEBNTNjPbB0',
            '9vvkz7ZMVX0CisFl8wX2aJunIidxn2q47ypHFm/yu39enNXyAk60QJOK1AlfsEDJ',
            'cplDznOdsFpeGYffnrlRt/cCgYA0qQl/5uNXEP63CnKcXQalCCZKcKEoZQRj6vos',
            '91H79PiaXen9LNip53rPX9r3nY2w5ONdpK620dzdhXN8iSyaNBTDTqvCBJe6VTLb',
            '3Otu4JO+rNuRYwheOjVQr8eQaHQkgbn0N+rYT3+VPtmZSmZGMY9ftfW3NhSsGQam',
            'L7gm3QKBgHP4pmlDez8VEGuC3+Kd7eAtxFccp+O98UMbitStKUG8MvswMi3Z6CcL',
            'GGWeKqV2Ec2Yqqd+4cPDyj/x9uOOIJJJn0V8GFJf/HxcdjXH/S8YuybpA0lndma5',
            'PVGdKJ9Wn0qMrdrzHhZyeNj8vA+0IuoRxI6OI639rTEBkx6egD3Z',
            '-----END RSA PRIVATE KEY-----'].join('\n'),
            key = null,
            startTime = 0;

        $scope.isIdle = false;
        $scope.print = cmUtil.prettify;
        $scope.state = 'press encrypt';
        $scope.passphrase = '';

        $scope.genPassphrase = function(){
            $scope.passphrase = cmCrypt.generatePassphrase();
        };

        $scope.startEncrypt = function(){
            $scope.isIdle = true;

            if($scope.passphrase == '')
                $scope.genPassphrase();

            startTime = (new Date()).getTime();

            key = new cmKey();
            key.setKey(privKey);
            key.encrypt($scope.passphrase);

            $scope.state = 'encryption success timeelapsed: '+cmUtil.millisecondsToStr((new Date()).getTime()-startTime, true);
            $scope.history.encryption.push(cmUtil.millisecondsToStr((new Date()).getTime()-startTime, true));

            $scope.isIdle = false;
        };

        $scope.startDecrypt = function(){
            if(key == null){
                $scope.state = 'please encrypt!';
                return false;
            }

            $scope.isIdle = true;

            startTime = (new Date()).getTime();

            key.encrypt($scope.passphrase);

            $scope.state = 'encryption success timeelapsed: '+cmUtil.millisecondsToStr((new Date()).getTime()-startTime, true);
            $scope.history.decryption.push(cmUtil.millisecondsToStr((new Date()).getTime()-startTime, true));
            $scope.isIdle = false;
        };

        $scope.clearHistory = function(){
            $scope.history = {
                encryption: [],
                decryption: []
            };
        };

        $scope.clearHistory();
    }
);