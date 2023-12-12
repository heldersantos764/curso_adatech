const cpf = document.getElementsByClassName('cpf');
const dataNasc = document.getElementsByClassName('data-nascimento')

const mascara = {
    cpf: '000.000.000-00',
    data: {
        mask: Date,
        pattern: 'd/`m/`Y',
        format: function (date) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            if (day < 10) day = "0" + day;
            if (month < 10) month = "0" + month;

            return [day, month, year].join('/');
        },
        parse: function (str) {
            var yearMonthDay = str.split('/');
            return new Date(yearMonthDay[2], yearMonthDay[1] - 1, yearMonthDay[0]);
        },
        min: new Date(1900, 0, 1),
        max: new Date(),
        lazy: false,
    }
};

for (const item of cpf) {
    IMask(item, mascara.cpf)
}

for (const item of dataNasc) {
    IMask(item, mascara.data)
}