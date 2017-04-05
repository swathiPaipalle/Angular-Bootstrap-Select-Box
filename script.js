angular.module('myApp', [])
  .directive('skDrSelectOption', ['$filter', '$window', '$document', function($filter, $window, $document) {
    return {
      restrict: 'AE',
      scope: {
        clientWidth: '@width',
        selectOptionItem: '&',
        selectedValue: '=',
        itemList: '=',
        notSelectedLabel: '@',
        isLabel: '=',
        isTranslate: '=',
        labelPrefix: '@',
        fieldName: '@',
        isError: '=',
        'isOneTranslateLabel': "="
      },
      link: function(scope, elem, attrs) {
        scope.selectedItem = '';

        function formatItemList() {
          scope.showList = false;
          scope.optionList = [{
              value: 'NONE',
              label: scope.notSelectedLabel
            }, {
              value: '0',
              label: 'Apple'
            }, {
              value: '1',
              label: 'Orange'
            }, {
              value: '2',
              label: 'Mango'
            },

          ];

          var currentWidth = elem.children()[0].clientWidth;
          scope.clientWidth = currentWidth;
        }

        scope.selectItem = function($event, item) {
          $event.preventDefault();
          $event.stopPropagation();
          scope.selectedItem = item;
          scope.selectedValue = item.value;
          scope.selectOptionItem({
            fieldName: scope.fieldName,
            value: item.value
          });
          scope.showList = false;
        };

        scope.showDropDown = function(isShow) {
          scope.showList = isShow;

          var el = elem[0].querySelector('div.btn-group-select-option');
          var rect = el.getBoundingClientRect();
          var clw = ($window.innerWidth || $document.documentElement.clientWidth);
          var clh = ($window.innerHeight || $document.documentElement.clientHeight);
          scope.isDropdownUp = false;
          if (rect.bottom + 134 > clh) {
            scope.isDropdownUp = true;
          }
        };
        //formatItemList();

        scope.$watch('itemList', function(newItemList) {
          formatItemList();
        });

      },
      templateUrl: 'select.html'
    };
  }]);