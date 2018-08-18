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