window.onload = function() {
    var array_dias = [];
    var contador_dias = {};
    var contador_meses = {};
    var contador_hora = {};
    var fileInput = document.getElementById('fileInput');
    var btn_horas = document.getElementById('horas');
    var btn_dias = document.getElementById('dias');
    var btn_meses = document.getElementById('meses');

    function renderChartHora(data, labels) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Hora',
                    borderColor: 'rgba(72, 201, 176, 1)',
                    backgroundColor: 'rgba(174, 214, 241, 0.2)',
                    data: data,
                }]
            },
        });
    }

    function renderChartDias(data, labels) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Dias',
                    borderColor: 'rgba(125, 206, 160, 1)',
                    backgroundColor: 'rgba(125, 206, 160, 0.2)',
                    data: data
                }]
            },
        });
    }

    function renderChartMeses(data, labels) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Meses',
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 0, 0, 1)'],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(192, 0, 0, 0.2)'],
                    data: data
                }]
            },
        });
    }

    btn_horas.addEventListener('click', function(e) {
        console.log('presionado btn_horas');
        //OBTENER HORAS
        array_dias.forEach(function(i) {
            var filtro_hora = moment(i).format('HH');
            contador_hora[filtro_hora] = (contador_hora[filtro_hora] || 0) + 1;
        });


        //====================================
        var arr1_hora = Object.keys(contador_hora);
        var arr2_hora = arr1_hora.map(function(a) {
            return contador_hora[a];
        });
        //====================================

        renderChartHora(arr2_hora, arr1_hora);
    });

    btn_dias.addEventListener('click', function(e) {
        console.log('presionado btn_dias');
        //OBTENER DIAS
        array_dias.forEach(function(i) {
            var filtro_dia = moment(i).format('dddd');
            contador_dias[filtro_dia] = (contador_dias[filtro_dia] || 0) + 1;
        });
        //====================================
        var arr1_dias = Object.keys(contador_dias);
        var arr2_dias = arr1_dias.map(function(c) {
            return contador_dias[c];
        });
        //====================================

        renderChartDias(arr2_dias, arr1_dias);
    });

    btn_meses.addEventListener('click', function(e) {
        //OBTENER MESES
        array_dias.forEach(function(i) {
            var filtro_mes = moment(i).format('MMMM');
            contador_meses[filtro_mes] = (contador_meses[filtro_mes] || 0) + 1;
        });

        //====================================
        var arr1_meses = Object.keys(contador_meses);
        var arr2_meses = arr1_meses.map(function(b) {
            return contador_meses[b];
        });
        //====================================
        renderChartMeses(arr2_meses, arr1_meses);
    });

    fileInput.addEventListener('change', function(e) {
        document.getElementById("horas").disabled = false;
        document.getElementById("dias").disabled = false;
        document.getElementById("meses").disabled = false;

        //fileInput es la variable con datos
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var lines = reader.result.split('\n');

                lines.forEach((row) => {
                    if (row.length > 0) {
                        if (moment(row.slice(0, 16), "DD/MM/YY HH:mm a").isValid() == true) {
                            array_dias.push(moment(row.slice(0, 16), "DD-MM-YY HH:mm a"));
                        }

                    }
                });
            }
            reader.readAsText(file);



        } else {
            fileDisplayArea.innerText = "File not supported!";
        }
    });


}