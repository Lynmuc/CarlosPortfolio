const form = document.getElementById('form');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const weigth = document.getElementById('weight').value;
    const heigth = document.getElementById('height').value;

    const bmi = (weigth / (heigth*weigth)).toFixed(2);

    const value = document.getElementById('value');
    let description = '';

    document.getElementById('infos').classList.remove('hidden');
    
    if (bmi < 18.5) {
        description = 'Cuidado! Você está abaixo do peso'
    }

    value.textContent = bmi;
    document.getElementById('description').textContent = description;




})

