//Salvar
api.custom_objects.create("treinamento", { 
    "nome" : "Leonardo", 
    "email" : "fernando@pmgflexo.com.br", 
    "idade" : "36 anos"
})

//proscope
api.proofscope.create_view_file_difference_url_with_options(
 "http://localhost:9090", 
 "cloudflow://PP_FILE_STORE/Demo%20Files/packaging_crab_orig.pdf", 
 "cloudflow://PP_FILE_STORE/Demo%20Files/packaging_crab_corrected.pdf", {
  email: "john@domain.com"
}) 

{
 result: "ok",
 url: "http://localhost:9090/portal.cgi?proofscope&asset_id=553a171ce7c40000000004e0&email=john%40domain.com&temp_scope=9d15496c-4651-4916-b56d-d340b39f6961&view_id=41d768b7-94cd-4aa6-9356-c558cbf5555e&signature=affb1cba796f20c0243e174c24707404"
}

	console.log(localStorage.getItem("session"));

        this._key.post('http://192.168.1.225:9090/portal.cgi',
            {
                'session': localStorage.getItem("session"),
                'method': 'custom_objects.count',
                'collection': 'treinamento'
            }

        ).subscribe((result) => {
            console.log('Sucesso');
            console.log(result);
            //this._router.navigate(['/production']);
        }, () => {
            console.log('Erro!');
        });



//pico




        angular.module('envia', ['ngFileUpload'])
    .directive('envia', function() {
        return {
            templateUrl: "resources/app/shared/_envia/template.html",
            restrict: "E",
            scope: {},
            controller: enviaController,
            controllerAs: 'vm',
        };
    })

    .factory('serviceEnvia', function($http, $q) {

        return {
            login: function() {
                return $http.post('http://cloudflow.clicheriablumenau.com.br:9090/portal.cgi', {
                    method: "auth.create_session",
                    user_name: "admin",
                    user_pass: "clicheria@2018",
                }).then(function() {
                    return result.data;
                });
            },

            getFile: function(session, file_orig, file_diff) {
                return $http.post('http://cloudflow.clicheriablumenau.com.br:9090/portal.cgi', {
                    session: session.session,
                    method: "proofscope.create_view_file_difference_url",
                    host_url: 'http://cloudflow.clicheriablumenau.com.br:9090',
                    file_url: file_orig,
                    diff_url: file_diff,
                }).then(function(result) {
                    return result.data;
                });
            },

            //auth.login
      this._login.post('http://192.168.1.225:9090/portal.cgi',
      {
        'session': session,
        'session_scope': '*',
        'method': this.form.get('senha').value,
      }

    ).subscribe(() => {
      console.log('Sucesso');
    }, () => {
      console.log('Deu merda!');
    });

            
            
            

//Only tests
//            getAPI: function(session, files, variables) {
//                return $http.post('http://cloudflow.clicheriablumenau.com.br:9090/portal.cgi', {
//                    session: session.session,
//                    method: "hub.start_from_whitepaper_with_files_and_variables",
//                    whitepaper_name: "CBL_Aprovacao Simples",
//                    input_name: "FromServer",
//                    files: files,
//                    variables: variables
//                }).then(function(result) {
//                    return result.data;
//                });
//            },
//            getApprovalid: function(session, workid) {
//                return $http.post('http://cloudflow.clicheriablumenau.com.br:9090/portal.cgi', {
//                    session: session.session,
//                    method: "hub.get_variables_from_workable",
//                    workable_id: workid,
//                    variables: ["proofscope_url"]
//                }).then(function(result) {
//                    return result.data;
//                });
//            },
//            getUrlApproval: function(session, approvalid) {
//                return $http.post('http://cloudflow.clicheriablumenau.com.br:9090/portal.cgi', {
//                    session: session.session,
//                    method: "approval.get_approval_id_from_workable",
//                    workable_id: workid,
//                }).then(function(result) {
//                    return result.data;
//                });
//            },
        }
    })

function enviaController($scope, $timeout, $sce, $interval, serviceEnvia, Upload) {

    var vm = this;

    var session = {};

    //Authentication
    var promise = serviceEnvia.login();
    promise.then(data => {
        session = data;
        console.log("Logou...");
    }, error => {
        alert('Ocorreu um erro! ');
    })

    var api = {};
    vm.request = {
        email: "rpereira1415@gmail.com"
    }

    //send request
    vm.enviar = function(original, diferenca) {
    	//make urls pdf's original and diff
    	original = "cloudflow://Aprovacao/" + original;
    	diferenca = "cloudflow://Aprovacao/" + diferenca;
    	
    	var promisePegaUrl = serviceEnvia.getFile(session, encodeURI(original), encodeURI(diferenca));
    	promisePegaUrl.then(data => {
    		//show proofscope in div
    		$scope.currentProjectUrl = $sce.trustAsResourceUrl(data.url);
    		
    	})
    }

}