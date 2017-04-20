(function () {
'use strict';

angular.module('RepoSearch', [])
.controller('RepoSearchController', RepoSearchController)
.service('RepoSearchService', RepoSearchService);

RepoSearchController.$inject = ['RepoSearchService'];
function RepoSearchController(RepoSearchService) {
  var findRepo = this;

  findRepo.name = '';
  findRepo.getData = function () {

    var promise = RepoSearchService.getData(findRepo.name);
    promise.then(function (response) {
      findRepo.repo = response.data.repos_url;

      findRepo.displayRepo();
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  findRepo.displayRepo = function () {
    var promise = RepoSearchService.displayRepo(findRepo.repo);
    var fName, att, iName, type, ivalue;
    promise.then(function (response) {
      for (var i = 0; i < response.data.length; i++) {

        fName = document.createElement('form');
        att = document.createAttribute('action');
        att.value = response.data[i].url;
        fName.setAttributeNode(att);

        iName = document.createElement('input');
        type = document.createAttribute('type');
        type.value = 'submit';
        ivalue = document.createAttribute('value');
        ivalue.value = response.data[i].name;
        iName.setAttributeNode(type);
        iName.setAttributeNode(ivalue);

        fName.appendChild(iName);
        document.body.appendChild(fName);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };
}


RepoSearchService.$inject = ['$http'];
function RepoSearchService($http) {
  var service = this;

  service.getData = function (name) {
    var response = $http({
      method: 'GET',
      url: "https://api.github.com/users/" + name
    });

    return response;
  };

  service.displayRepo = function (repo) {
    var response = $http({
      method: 'GET',
      url: repo
    });

    return response;
  }
}

})();
