// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
import Sortable from 'sortablejs';
require("@rails/ujs").start()
require("turbolinks").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

document.addEventListener('DOMContentLoaded', (e) => {
  const list = document.getElementById('sortable');
  const result_list = document.getElementById('result');
  const form = document.querySelector('form');
  const word = document.getElementById('word');
  console.log('hi')

  const sortable = Sortable.create(list, {
    group: 'list',
    animation: 100
  });

  const resultSortable = Sortable.create(result, {
    group: {
      name: 'result',
      put: ['list']
    },
    animation: 100,

    onMove: function() {
      const results_array = [];
      const results = document.querySelectorAll('#result li');
      results.forEach(element => {
        results_array.push(element.innerHTML.trim());
      });

      console.log(results_array);
      word.value = results_array.join("");
      console.log(word);
    }

  });

  

  result_list.addEventListener('onmove', (e) => {
    
  });

});
  

  