

(function() {

    var asc = true;
    var lastClickedId = 0;

    function setDirectionToOrder(clickedThId) {
        if (lastClickedId == clickedThId) {
            invertOrder();
        }
        else {
            asc = true;
            lastClickedId = clickedThId;
        }
    }

    function invertOrder() {
        if (asc == true) {
            asc = false;
        }
        else {
            asc = true;
        }
    }


    // Returns the text content of a cell.
    function getCellValue(tr, idx) {
        return tr.children[idx].textContent; // idx indexes the columns of the row
    }

    /*
	 * Creates a function that compares two rows based on the cell in the idx position
	 */
    function createComparer(idx, asc) {
        return function(a, b) {
            // get values to compare at column idx
            // if order is ascending, compare 1st row to 2nd , otherwise 2nd to 1st
            var v1 = getCellValue(asc ? a : b, idx),
            v2 = getCellValue(asc ? b : a, idx);

            //if mark column
            if (lastClickedId == 5){
                var num1;
                var num2;

                switch(v1){
                    case "<empty>":
                        num1 = 0;
                        break;
                    case "absent":
                        num1 = 1;
                        break;
                    case "failed":
                        num1 = 2;
                        break;
                    case "skip next round":
                        num1 = 3;
                        break;
                    case "30 with honor":
                        num1 = 31;
                        break;
                    default:
                        num1 = parseInt(v1);
                        break;         
                }

                switch(v2){
                    case "<empty>":
                        num2 = 0;
                        break;
                    case "absent":
                        num2 = 1;
                        break;
                    case "failed":
                        num2 = 2;
                        break;
                    case "skip next round":
                        num2 = 3;
                        break;
                    case "30 with honor":
                        num2 = 31;
                        break;
                    default:
                        num2 = parseInt(v2);
                        break;         
                }
                
                return num1 - num2; // v1 greater than v2 --> true
            }

            // If non numeric value
            if (v1 === '' || v2 === '' || isNaN(v1) || isNaN(v2)) {
                return v1.toString().localeCompare(v2.toString()); // lexical comparison
            }
            // If numeric value
            return v1 - v2; // v1 greater than v2 --> true
        };
    }

    // For all table headers f class sortable
    document.querySelectorAll('th.sortable').forEach(function(th) {
        // Add a listener on the click event
        th.addEventListener("click", function() {

            var table = th.closest('table'); // get the closest table tag

            //gets the inex of the clicked th
            var clickedColumn = Array.from(th.parentNode.children).indexOf(th);
            //gets the order that the table should be ordered to
            setDirectionToOrder(clickedColumn);

            // For every row in the table body
            // Use Array.from to build an array from table.querySelectorAll result
            // which is an Array Like Object (see DOM specifications)
            Array.from(table.querySelectorAll('tbody > tr'))
            // Toggle the criterion and to sort rows with the comparator function
            // passing
            // (index of column to compare, sort criterion asc or desc) --this is
            // the the
            // element
            .sort(createComparer(clickedColumn, asc))
            // Append the sorted rows in the table body
            .forEach(function(tr) {
                table.querySelector('tbody').appendChild(tr)
            });
        });
    });


})();  //IIFE to avoid for variables to end up in the global scope