var nameNumbers_pt = [
    ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'],
    ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'],
    ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']
];

var nameNumbers_en = [
    ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
    ['', 'hundred', 'two hundred', 'three hundred', 'four hundred', 'five hundred', 'six hundred', 'seven hundred', 'eight hundred', 'nine hundred']
];

var dozens_pt = [
    'dez',
    'onze',
    'doze',
    'treze',
    'quatorze',
    'quinze',
    'dezesseis',
    'dezessete',
    'dezoito',
    'dezenove'
];

var dozens_en = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
];

var millions_pt = [
    '',
    'mil',
    'milhões',
    'bilhões',
    'trilhões',
    'quatrilhões',
    'quintilhões',
    'sextilhões',
    'septilhões',
    'octilhões',
    'nonilhões',
    'decilhões',
    'undecilhões',
    'duodecilhões',
    'tredecilhões'
];

var millions_en = [
    '',
    'thousand',
    'millions',
    'billion',
    'trillions',
    'quadrillion',
    'quintillions',
    'sextillions',
    'septillions',
    'octillions',
    'noillões',
    'decilions',
    'undecellations',
    'duodecils',
    'tredecilhões'
];

var isMinus = false;

function groupNumbers(number) {
    var result = '';

    if (number[0] === '-') {
        isMinus = true;
        number = number.replace('-', '');
    }

    if (number == '100' && language == 'pt') {
        return 'cem';
    } else if (number == '100' && language == 'en') {
        return 'one hundred';
    } else {
        for (var i = 0; i < number.length; i++) {
            var c = number[i];
            var elementDozens = this['dozens_' + language][+number[i + 1]];
            var elementnameNumbers = this['nameNumbers_' + language][number.length - i - 1][+c];

            if (result && language == 'pt') {
                result += ' e ';
            } else if (result && language == 'en') {
                result += ' and ';
            }

            if (((number.length == 2 && i == 0) || (number.length == 3 && i == 1)) && c == '1') {
                return result + elementDozens;
            }

            result += elementnameNumbers;
        }

        return result;
    }
}

function extensionNumber(number) {
    if (listLanguages.includes(language)) {
        var result = [];
        var numbers = [];

        number = number.toString();

        while (number.length > 0) {
            var piece = number.length <= 3 ? number : number.substr(number.length - 3, 3);

            numbers.push({ number: +piece, name: groupNumbers(piece) });
            number = number.length - 3 > 0 ? number.substr(0, number.length - 3) : '';
        }

        if (numbers.length == 1 && numbers[0].number == 0) {
            return numbers[0].name;
        }

        for (var i = numbers.length - 1; i > 0; i--) {
            if (numbers[i].number != 0) {
                var elementMillions = this['millions_' + language][i];

                if (language == 'pt') {
                    result.push(numbers[i].name + ' ' + (numbers[i].number == 1 ? elementMillions.replace('ões', 'ão') : elementMillions));
                } else if (language == 'en') {
                    result.push(numbers[i].name + ' ' + (numbers[i].number == 1 ? elementMillions.replace('ions', 'ion') : elementMillions));
                }
            }
        }

        if (numbers.length && numbers[0].number > 0) {
            result.push(`${(numbers.length > 1 && (numbers[0].number < 100 || numbers[0].number % 100 == 0) ? 'e ' : '')}${numbers[0].name}`);
        } else if (result.length > 1) {
            result.splice(result.length - 1, 0, 'e');
        }

        result = result.join(' ');

        if (isMinus && language == 'pt') {
            result = 'menos ' + result;
        } else if (isMinus && language == 'en') {
            result = 'minus ' + result;
        }

        return result;
    } else {
        return 'invalid language';
    }
}

var listLanguages = ['en', 'pt'];
var language = 'pt';
var string = '1993';
console.log('result: ', extensionNumber(string));