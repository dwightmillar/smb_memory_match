for (let blockIndex = 0; blockIndex < 10; blockIndex++){
  $('header').prepend($('<div>', { class: 'block'}));
}

for (let blockIndex = 0; blockIndex < 2; blockIndex++) {
  $('aside').append($('<div>', { class: 'block' }));
}
