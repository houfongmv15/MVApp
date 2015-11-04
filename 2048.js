 // 2048 Game
 var animationSpeed = 500;
 var isTileLocked = true;
 $(document).ready(function() {
     for (i = 0; i < 4; ++i) {
         for (j = 0; j < 4; ++j) {
             $('#tilesWrapper').append(
                 '<div class = "tileCell clearTile" data-row="' + i +
                 '" data-column="' + j + '"/>');
         }
         $('#tilesWrapper').append('<div style = "clear:both"></div>');
     }
     generateTileValue(2);
     generateTileValue(2);
 });

 function generateTileValue(tileValue) {
     // Get the count of empty Tiles  
     var clearTilesCount = $('.clearTile').length;
     var generateRandom = Math.floor(Math.random() * clearTilesCount);
     var tile = $('.clearTile').eq(generateRandom);
     $(tile).removeClass('clearTile').addClass('filledTile');
     $('#tilesWrapper').append(
         '<div id = "lastadded" class = "tile" data-row="' + $(tile).attr(
             'data-row') + '" data-column="' + $(tile).attr(
             'data-column') + '">' + tileValue + '</div>');
     var tilePosition = $(tile).position();
     $('#lastadded').css({
         top: (tilePosition.top + 8) + 'px',
         left: (tilePosition.left + 8) + 'px'
     })
     $('#lastadded').fadeTo(animationSpeed, 1, function() {
         isTileLocked = false;
         displayScore();
     })
     $('#lastadded').attr('id', '');
 }

 function displayScore() {
     var score = 0;
     $('.tile').sort(function(a, b) {
         var intA = parseInt($(a).html());
         var intB = parseInt($(b).html());
         return intA === intB ? 0 : intA < intB ? 1 : -1;
     }).each(function() {
         var tempScore = parseInt($(this).html());
         score = score + tempScore;
     });
     score *= parseInt($('.tile').first().html());
     score *= 0.5;
     $('#displayScore').html('Score: ' + score);
 }
 $(document).keypress(function(evt) {
     event.preventDefault();
     var keycode = evt.charCode;
     if (!isTileLocked) {
         isTileLocked = true;
         isTileMoved = false;
         //  alert( 'Keypress ' + keycode);  
         switch (keycode) {
             // When  Key W is pressed   // Up Key
             case 119:
                 $('.tile').sort(function(a, b) {
                     var rowA = parseInt($(a).attr('data-row'));
                     var rowB = parseInt($(b).attr('data-row'));
                     return rowA === rowB ? 0 : rowA < rowB ? 1 :
                         -1;
                 }).each(function() {
                     // Set value for current Tiles.
                     var currentColumn = parseInt($(this).attr(
                         'data-column'));
                     var currentRow = parseInt($(this).attr(
                         'data-row'));
                     var currentValue = parseInt($(this).html());
                     // set initial value to check collision
                     var destinationRow = currentRow;
                     $(this).attr('data-collided', 0);
                     if (currentRow > 0) {
                         // set initial value for counter 
                         var ctr = currentRow - 1;
                         while (ctr >= 0) {
                             var tileCell = $(
                                 '.tileCell[data-column=' +
                                 currentColumn +
                                 '][data-row=' + ctr + ']');
                             var tileValue = parseInt($(
                                 '.tile[data-column=' +
                                 currentColumn +
                                 '][data-row=' + ctr +
                                 ']').html());
                             if (tileCell.hasClass('filledTile')) {
                                 // Set data-collided if collision happened.
                                 if (currentValue == tileValue) {
                                     $(this).attr(
                                         'data-collided', 1
                                     )
                                     destinationRow = ctr;
                                 }
                                 break;
                             } else {
                                 destinationRow = ctr;
                             }
                             --ctr;
                         }
                         // update the isTileMoved if the destinationRow is different
                         if (currentRow != destinationRow) {
                             isTileMoved = true;
                             // move tiles and collide to the destination
                             $(this).animate({
                                     top: '-=' + (100 * (
                                         currentRow -
                                         destinationRow
                                     ))
                                 }, animationSpeed,
                                 function() {
                                     // If tiles collided. Double up the value in tiles and remove it from the screen.
                                     if ($(this).attr(
                                         'data-collided'
                                     ) == 1) {
                                         if (currentValue *
                                             2 == 2048) {
                                             $("#systemMsg")
                                                 .html(
                                                     '<div class="alert alert-success" role="alert"><strong>Congratulation</strong><br/> You WON !!!</div>'
                                                 );
                                         }
                                         $(
                                             '.tile[data-column=' +
                                             currentColumn +
                                             '][data-row=' +
                                             destinationRow +
                                             ']').html(
                                             currentValue *
                                             2);
                                         $(this).remove();
                                     }
                                 });
                             remarkTileCellUpDown($(this),
                                 currentColumn, currentRow,
                                 destinationRow);
                         }
                     }
                 })
                 break;
                 // When  Key S is pressed   // Down Key
             case 115:
                 $('.tile').sort(function(a, b) {
                     var rowA = parseInt($(a).attr('data-row'));
                     var rowB = parseInt($(b).attr('data-row'));
                     return rowA === rowB ? 0 : rowA < rowB ? -
                         1 : 1;
                 }).each(function() {
                     // Set value for current Tiles.
                     var currentColumn = parseInt($(this).attr(
                         'data-column'));
                     var currentRow = parseInt($(this).attr(
                         'data-row'));
                     var currentValue = parseInt($(this).html());
                     // set initial value to check collision
                     var destinationRow = currentRow;
                     $(this).attr('data-collided', 0);
                     if (currentRow <= 3) {
                         // set initial value for counter 
                         var ctr = currentRow + 1;
                         while (ctr <= 3) {
                             var tileCell = $(
                                 '.tileCell[data-column=' +
                                 currentColumn +
                                 '][data-row=' + ctr + ']');
                             var tileValue = parseInt($(
                                 '.tile[data-column=' +
                                 currentColumn +
                                 '][data-row=' + ctr +
                                 ']').html());
                             if (tileCell.hasClass('filledTile')) {
                                 // Set data-collided if collision happened.
                                 if (currentValue == tileValue) {
                                     $(this).attr(
                                         'data-collided', 1
                                     )
                                     destinationRow = ctr;
                                 }
                                 break;
                             } else {
                                 destinationRow = ctr;
                             }
                             ++ctr;
                         }
                         // update the isTileMoved if the destinationRow is different
                         if (currentRow != destinationRow) {
                             isTileMoved = true;
                             // move tiles and collide to the destination
                             $(this).animate({
                                     top: '+=' + (100 * (
                                         destinationRow -
                                         currentRow
                                     ))
                                 }, animationSpeed,
                                 function() {
                                     // If tiles collided. Double up the value in tiles and remove it from the screen.
                                     if ($(this).attr(
                                         'data-collided'
                                     ) == 1) {
                                         if (currentValue *
                                             2 == 2048) {
                                             $("#systemMsg")
                                                 .html(
                                                     '<div class="alert alert-success" role="alert"><strong>Congratulation</strong><br/> You WON !!!</div>'
                                                 );
                                         }
                                         $(
                                             '.tile[data-column=' +
                                             currentColumn +
                                             '][data-row=' +
                                             destinationRow +
                                             ']').html(
                                             currentValue *
                                             2);
                                         $(this).remove();
                                     }
                                 });
                             remarkTileCellUpDown($(this),
                                 currentColumn, currentRow,
                                 destinationRow);
                         }
                     }
                 })
                 break;
                 // When  Key A is pressed   // Left Key
             case 97:
                 $('.tile').sort(function(a, b) {
                     var columnA = parseInt($(a).attr(
                         'data-column'));
                     var columnB = parseInt($(b).attr(
                         'data-column'));
                     return columnA === columnB ? 0 : columnA <
                         columnB ? 1 : -1;
                 }).each(function() {
                     // Set value for current Tiles.
                     var currentColumn = parseInt($(this).attr(
                         'data-column'));
                     var currentRow = parseInt($(this).attr(
                         'data-row'));
                     var currentValue = parseInt($(this).html());
                     // set initial value to check collision
                     var destinationColumn = currentColumn;
                     $(this).attr('data-collided', 0);
                     if (currentColumn > 0) {
                         // set initial value for counter 
                         var ctr = currentColumn - 1;
                         while (ctr >= 0) {
                             var tileCell = $(
                                 '.tileCell[data-column=' +
                                 ctr + '][data-row=' +
                                 currentRow + ']');
                             var tileValue = parseInt($(
                                 '.tile[data-column=' +
                                 ctr + '][data-row=' +
                                 currentRow + ']').html());
                             if (tileCell.hasClass('filledTile')) {
                                 // Set data-collided if collision happened.
                                 if (currentValue == tileValue) {
                                     $(this).attr(
                                         'data-collided', 1
                                     )
                                     destinationColumn = ctr;
                                 }
                                 break;
                             } else {
                                 destinationColumn = ctr;
                             }
                             --ctr;
                         }
                         // update the isTileMoved if the destinationRow is different
                         if (currentColumn != destinationColumn) {
                             isTileMoved = true;
                             // move tiles and collide to the destination
                             $(this).animate({
                                     left: '-=' + (100 * (
                                         currentColumn -
                                         destinationColumn
                                     ))
                                 }, animationSpeed,
                                 function() {
                                     // If tiles collided. Double up the value in tiles and remove it from the screen.
                                     if ($(this).attr(
                                         'data-collided'
                                     ) == 1) {
                                         if (currentValue *
                                             2 == 2048) {
                                             $("#systemMsg")
                                                 .html(
                                                     '<div class="alert alert-success" role="alert"><strong>Congratulation</strong><br/> YOU Won !!!</div>'
                                                 );
                                         }
                                         $(
                                             '.tile[data-column=' +
                                             destinationColumn +
                                             '][data-row=' +
                                             currentRow +
                                             ']').html(
                                             currentValue *
                                             2);
                                         $(this).remove();
                                     }
                                 });
                             remarkTileCellLeftRight($(this),
                                 currentColumn, currentRow,
                                 destinationColumn);
                         }
                     }
                 })
                 break;
                 // When  Key D is pressed   // Right Key
             case 100:
                 $('.tile').sort(function(a, b) {
                     var columnA = parseInt($(a).attr(
                         'data-column'));
                     var columnB = parseInt($(b).attr(
                         'data-column'));
                     return columnA === columnB ? 0 : columnA <
                         columnB ? -1 : 1;
                 }).each(function() {
                     // Set value for current Tiles.
                     var currentColumn = parseInt($(this).attr(
                         'data-column'));
                     var currentRow = parseInt($(this).attr(
                         'data-row'));
                     var currentValue = parseInt($(this).html());
                     // set initial value to check collision
                     var destinationColumn = currentColumn;
                     $(this).attr('data-collided', 0);
                     if (currentColumn <= 3) {
                         // set initial value for counter 
                         var ctr = currentColumn + 1;
                         while (ctr <= 3) {
                             var tileCell = $(
                                 '.tileCell[data-column=' +
                                 ctr + '][data-row=' +
                                 currentRow + ']');
                             var tileValue = parseInt($(
                                 '.tile[data-column=' +
                                 ctr + '][data-row=' +
                                 currentRow + ']').html());
                             if (tileCell.hasClass('filledTile')) {
                                 // Set data-collided if collision happened.
                                 if (currentValue == tileValue) {
                                     $(this).attr(
                                         'data-collided', 1
                                     )
                                     destinationColumn = ctr;
                                 }
                                 break;
                             } else {
                                 destinationColumn = ctr;
                             }
                             ++ctr;
                         }
                         // update the isTileMoved if the destinationRow is different
                         if (currentColumn != destinationColumn) {
                             isTileMoved = true;
                             // move tiles and collide to the destination
                             $(this).animate({
                                     left: '+=' + (100 * (
                                         destinationColumn -
                                         currentColumn
                                     ))
                                 }, animationSpeed,
                                 function() {
                                     // If tiles collided. Double up the value in tiles and remove it from the screen.
                                     if ($(this).attr(
                                         'data-collided'
                                     ) == 1) {
                                         if (currentValue *
                                             2 == 2048) {
                                             $("#systemMsg")
                                                 .html(
                                                     '<div class="alert alert-success" role="alert"><strong>Congratulation</strong><br/> You WON !!!</div>'
                                                 );
                                         }
                                         $(
                                             '.tile[data-column=' +
                                             destinationColumn +
                                             '][data-row=' +
                                             currentRow +
                                             ']').html(
                                             currentValue *
                                             2);
                                         $(this).remove();
                                     }
                                 });
                             remarkTileCellLeftRight($(this),
                                 currentColumn, currentRow,
                                 destinationColumn);
                         }
                     }
                 })
                 break;
         }
     }
     // Generate New Tiles if Tile is moved. 
     if (isTileMoved) {
         generateTileValue(2);
     } else {
         isTileLocked = false;
     }
 });

 function remarkTileCellUpDown(element, cColumn, cRow, dRow) {
     // Mark current tile as Empty Tile
     $('.tileCell[data-column=' + cColumn + '][data-row=' + cRow + ']').removeClass(
         'filledTile').addClass('clearTile');
     // Update the current tile'srow value with new value amd marked the relevant tileCell as used. 
     element.attr('data-row', dRow);
     $('.tileCell[data-column=' + cColumn + '][data-row=' + dRow + ']').removeClass(
         'clearTile').addClass('filledTile');
 }

 function remarkTileCellLeftRight(element, cColumn, cRow, dColumn) {
     // Mark current tile as Empty Tile
     $('.tileCell[data-column=' + cColumn + '][data-row=' + cRow + ']').removeClass(
         'filledTile').addClass('clearTile');
     // Update the current tile'srow value with new value amd marked the relevant tileCell as used. 
     element.attr('data-column', dColumn);
     $('.tileCell[data-column=' + dColumn + '][data-row=' + cRow + ']').removeClass(
         'clearTile').addClass('filledTile');
 }