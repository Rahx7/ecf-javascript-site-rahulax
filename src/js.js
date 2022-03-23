
        // mes liens du haut --------------------------
        function mouvCat(objj){
            let idCat = objj.getAttribute("cat");

            let clicBloc = document.getElementById("bloc_"+idCat+"");
            let offSetBloc = clicBloc.offsetTop - 10;
            
            // on scroll en haut smouth
            document.getElementById("main").scrollTo({  top: offSetBloc, behavior: 'smooth'  });

            let mesButton = document.querySelectorAll('#menuHeader button');
                    mesButton.forEach(element => {
                    element.classList.remove("hover");
                    element.firstChild.classList.remove("hoverI");
                        
                    });


            objj.classList.add('hover');
            objj.firstChild.classList.add('hoverI');

            
        }
        //----------------------------------------- 

        document.getElementById('main').addEventListener("scroll", () => {        }        
        
        
        );

        //------------------------------------------



        // MNO SLIDER BOOTstRAP----------------------------------------
        // document.getElementById('slider').carousel({
        // interval: 5000,
        // pause: "hover"
        // });


        //-----------------------------


        // je récupère mon conteneur pour mes produits (maj, en fait nan c'est plus bas lol)

        //if(typeof test == "undefined"){alert('coucou')}
        
        let article_b = false;
        //localStorage.clear();
        let pageCat;

        // je veirife si la categorie dans storage existe sinon c accueil (pour le reloading)
        if(!localStorage.pageCat){ pageCat = "accueil"; localStorage.pageCat = "accueil";}else{ pageCat = localStorage.pageCat;}
        let numClic;  // mon nombre de clik qui servira a nommer mes articles dans mon storage
         

        let divTop; // ici les div qui supporteront les resultat du clic
        let divGauche; // elles remplaceront ce qui a dans la div intro
        let divDroite; // je comptais ouvrir une nouvelle fenetre dans le navigateur finalement on envoi tout ici ! en tout cas pour la page article


            //////    ma requete XMLHttpRequest ---------------------------------------------- GET
        let myArr; // mon tableau de resultat de la requete

            // j'instancie une requete
        let xhr = new XMLHttpRequest();

            // mon url json  
        let url = "http://rahulax.fr/ecf/json/monJson.json";
        //    let url = "http://127.0.0.1:5500/json/monJson.json";
        //je configure ma requete post, get put ou delete, true pour asynchrone 
        xhr.open('get', url, true);
        //xhr.responseType = "arraybuffer";
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
        
        
        

            /// je configure ma function onload sur recupJson
        xhr.onload = recupJson;
        xhr.onerror = maRep ;
        function maRep(e){
            console.log(e);
            console.log( xhr.status);
            console.error(myArr);
        }
        
        function recupJson(){     
            ///e;               
            myArr = JSON.parse(this.response);
            gestionArr(myArr);
            
        
        };

        // j'envoie ma requete
        xhr.send();


        //la progression de ma requete --
        // xhr.addEventListener("progress", progression, false);
        // function progression(e){
        // }

        //  ou bien 
        // xhr.onprogress = function (event){
        //     event.loaded; 
        //     event.total;
        // }
        
        ///-------------------------------------------------------------------

        /// ma fonction pour push dans mon json (qui marche pas erreur 405 method not allowed )-----------------------------------
         // recuperation de mon formulaire avec une nouvelle xmlHttpRequest pour PUT
   
     /*   let xhrPost = new XMLHttpRequest(); 

        function recupForm(){

            
            let url2 = "http://rahulax.fr/ecf/json/monJson2.json";
            //let url2 = "http://localhost:5500/json/monJson2.json";

            xhrPost.open("put", url2);
            let ob;
            xhrPost.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xhrPost.onload = function (){
                 let titreForm = document.getElementById("titreId").value;
                let texteForm = document.getElementById("texteId").value;
                let imgForm = document.getElementById("imageId").value;
                let imgGrandeForm = document.getElementById("imageGrandeId").value;
                let catForm = document.getElementById("catId").value;
                ob = {"ra":"test"};
                myArr.article[0].push(ob);       //  [{"ra":"test","ra":"test","ra":"test"}]
                console.log(" la responseURL "+xhrPost.responseURL);
                console.log(" la upload  %o", xhrPost.upload);
                console.log(" la responseType "+xhrPost.responseType, " la reponse "+xhrPost.response," la statusText "+xhrPost.statusText, );
            };  
 
                xhrPost.loadstart = function (){ alert('upload start !')}
                xhrPost.loadend = function (){ alert('upload ended !')}
                xhrPost.send(JSON.stringify(myArr));

            //myArr.article[catForm].

                        // const fileSystem = require("browserify-fs")

                    
                        // const data = JSON.stringify(myArr);

                        // fileSystem.writeFile("./newClient.json", data, err=>{
                        // if(err){
                        // console.log("Error writing file" ,err)
                        // } else {
                        // console.log('JSON data is written to the file successfully')
                        // }
                        // })

        }*/

        //---------------------------------------------

        function laUne(arr){

                        // je récupère et calle les élément autres ( texte intro et texte a la une) 
            document.querySelector('#intro p').innerHTML = arr.autres.accueil;
            document.querySelector('#jour').lastElementChild.innerHTML = arr.autres.texteUne;
            document.getElementById('jour').setAttribute('cat',0); // attribut pour ALAUne soit 0


           //je recupère et calle mes vidéos à la une -----------------------
            arr.une.forEach((element,index) => {

            index+=1;//pour acceder à mes 3 div mais en 3,4 et 5eme position dans le node

            let divJour =  document.getElementById('jour').children[index];
            divJour.firstElementChild.style.backgroundImage = "url("+element.urlImg+")"; // ma première div

            divJour.children[1].innerHTML = element.texte; //le h2 étant a l'intérieur de ma div je met d'abord le texte

            let stringH2 = "<h2>"+element.titre+"</h2>"; // puis j'ajoute dedans mon titre  h2
            divJour.children[1].insertAdjacentHTML('afterbegin', stringH2 ); // en premier avant mon texte

            let numUne = index-1;
            divJour.setAttribute("num",numUne); // j'ajoute un attribut a chaque article dans UNE
                    
            });//-------------------------------------------------------------

        }

        
            //ici ma fonction qui gère mon tableau de reponse -----------------------
        function gestionArr(arr){

            laUne(arr); // pour ma une 



 
        
            // je récupère chaque div_bloc (mes partie) et calle mes titre et mes introduction dedans
            arr.general.forEach((element, index) => {
                let num = index+1;
                let bloc = document.getElementById("bloc_"+num+"")
                
                bloc.children[0].innerHTML = element.titre; // le h1 des partie
                bloc.children[1].innerHTML = element.texte; // le p intro des partie
                
            });




            // ici mes articles de mes parties ---------------------
            for (let i = 1; i < 5; i++) {
                // const element = array[i];
                
                let bloc2 = document.getElementById("bloc_"+i+"");

                let ii = i-1;
                arr.article[ii].forEach((element,index) => {
                    let urlImg = element.urlImg;
                    let titre = element.titre;
                    let text = element.texte;
                    let duree = element.durée;

                    // je cree les elements pour 1 produit page accueil
                    let div = document.createElement('div');

                    let numArticle = index+1;
                    div.setAttribute('num',numArticle); // j'ajoute un atribut pour le recupérer dans le local storage afin d'envoyer la bonne page
                    
                    let numBloc = i;
                    bloc2.setAttribute('cat', numBloc); 

                    // je crée les élément de mon article-----------------------
                    let img = document.createElement('img');
                    img.src = urlImg;              
                    img.width = 100;
                    img.height = 100;
                
                    let h2 = document.createElement('h2');
                    h2.innerHTML = titre;
                    let p = document.createElement('p');
                    p.innerHTML = text
                    let span =  document.createElement('span');
                    span.innerHTML = duree;
                    //-------------------------------
                    // j'inbjecte mes élément dans ma div article
                    p.appendChild(span); 

                    div.appendChild(img);
                    div.appendChild(h2);
                    div.appendChild(p);

                    bloc2.appendChild(div);
                    
                    
                    // les listener sont ajouté à la fonction init
                    // mais on pourrait les ajouter ici

                    // finalment ça aurai été mieux pour eviter les queryselectorall sachant que je 
                    //veux qu'a partir des 2 premier intro et jour exclu et que chaqu'un ont leur dom perso
                   //  dans le json j'aurai du faire autrement !


                });
        }

        }

        //-----------------------------------------------------------------------------

        
        //---------------- ma fonction init() ------------------------------------

        document.onload = setTimeout(init, 500); // pour ajouter mes listener je dois avoir mes elements de chargé donc setTimeout
        function init (){

            for (let i = 1; i < 5; i++) {                  
                let liens  = document.querySelectorAll("#bloc_"+i+" > div"); // je boucle sur mes 4 partie bloc_

                liens.forEach(element => {
                    element.addEventListener('click', appel);  // j'ajoute mes listener a mes produits bloc_
                });  
            }


            let lienJour = document.querySelectorAll("#jour > div");

            lienJour.forEach(element => {
                    element.addEventListener('click', appel);  // j'ajoute mes listener a mes produits #jour
                });
            
            if(localStorage.pageCat == "articles"){initArticle()};

           document.getElementById("logo").addEventListener("click", function(){ // pour revenir a l'accueil en cliquant sur le logo rahulax
            localStorage.pageCat = "accueil";
            window.open("index.html","_parent");
            //laUne(myArr);

           });
        }

                //-------------------------------------------------------
        
            //------------------- la fonction appel sur mes click > sauvegarde Storage et nouvelle fenetre (ou pas !)-------------------
            
            
            //localStorage.clear();
            if (!localStorage.numClic == undefined) { numClic = localStorage.numClic } else { numClic = 0 }; // je verifie si on a déja cliqué sinon on recupère le nombre de clic 

            function appel(e = new Event) {

                // j'ajoute a chaque clic une nouvelle clé et ainsi connaitre les derniers article cliqué
                numClic++;
                

                // là je recupère la date
                let dateArticle = new Date();
                let jour = dateArticle.getDate();
                let mois = dateArticle.getMonth();
                let annee = dateArticle.getFullYear();
                let heure = dateArticle.getHours();
                let minute = dateArticle.getMinutes()

                let today = "le_" + jour + "_" + mois + "_" + annee + "_a_" + heure + ":" + minute + "";


                let article = e.currentTarget.getAttribute("num"); // je recupère l'attribut num de mes articles c qui correspond a sa place dans mon node
                
                // je supprime tous les ancient style au div article ainsi de beforeok la pseudo class
                let mesDivArtTout = document.querySelectorAll("#main > div >div");

                mesDivArtTout.forEach((element,index) => {
                    if(index == 3){
                        element.style.backgroundColor = "#fff";
                        element.children[0].classList.remove('beforeOk');
                        element.parentElement.children[2].children[0].classList.remove('beforeOk');
                        element.parentElement.children[3].children[0].classList.remove('beforeOk');


                    }

                    if(index>3){
                    element.style.backgroundColor = "#fff";
                    element.classList.remove('beforeOkDiv');
                }
                                       
                });

                // j'ajoute un style a mon div article (contour, fond)
                //e.currentTarget.style.outline = "2px solid #ddd"
                if(e.currentTarget.parentElement.id == "jour"){e.currentTarget.children[0].classList.add('beforeOk');}
                e.currentTarget.classList.add('beforeOkDiv');
                e.currentTarget.style.borderRadius = "10px"
                e.currentTarget.style.backgroundColor = "#ddd"

                // on scroll en haut smouth
                 document.getElementById("main").scrollTo({
                                                        top: 0,
                                                        left: 0,
                                                        behavior: 'smooth'
                                                        });



                // j'injecte mon num d'article et mon id bloc_ dans mon localStorage pour le récupérer après
                localStorage.setItem('article', article);
                localStorage.setItem('cat', e.currentTarget.parentElement.getAttribute("cat"));
                //localStorage.toto = 28;


                localStorage.setItem('numClic', numClic); // mon nombre de clic
                localStorage.setItem(numClic, "" + article + "_" + e.currentTarget.parentElement.getAttribute("cat") + "_" + today + "_" + numClic + "");  // mes article vu avec num article, category et date  
                
                if(pageCat == "accueil"){
                //window.open("articles.html","_parent");
                pageCat = "articles";
                localStorage.pageCat = pageCat;
                }

                if(pageCat == "articles"){ // si ma page est un article
                   initArticle(); 
                };

            }

            //---------------------------------------------------------------------------------


            function initArticle(){

                if(!article_b){  // si on est pas sur article 

                        let intro = document.getElementById("intro");

                        divTop = document.createElement('div');
                        divGauche = document.createElement('div');
                        divDroite = document.createElement('div');
                        

                        divTop.className = "top";
                        divGauche.className = "gauche";
                        divDroite.className = "droite";

                        intro.innerHTML = "";// je vide mon intro d'abord

                        intro.appendChild(divTop); // puis j'y ajoute mes créate
                        intro.appendChild(divGauche);
                        intro.appendChild(divDroite);
                        
                        article_b = true;

                };
                

                let idArt = localStorage.article; // les infos du local storage pour trouver l'article
                let idCat =  localStorage.cat;
                let arrDiv;
                let idCatBis = idCat-1 ;
                if (idCat == 0) {
                    arrDiv = myArr.une; // mes article à la une (cat 0) ne sont pas disposé pareil que ceux les autres article dans mon json
                }                           
                else {
                    
                    arrDiv = myArr.article[idCatBis]; // donc je change d'endroit dans le dom du json
                }

                if(arrDiv !== myArr.une) idArt-=1; // et ouai ! entre affichage et tableau l'identifiant c toujour un peu le foutoir

                let titre = arrDiv[idArt].titre; // je recupe mes infos du json avec les identifiant du local storage
                let texte = arrDiv[idArt].texte
                let duree = arrDiv[idArt].durée;
                let urlImg = arrDiv[idArt].urlImg;
                let urlImgTop = arrDiv[idArt].urlImgTop;


                // ici pour le h1 de la page des articles (histoire de savoir où on est)
                let category;


                if(arrDiv == myArr.une){category = "A la Une"}
                    else if(idCat == 1){category = "Les méditations"}
                    else if(idCat == 2){category = "Les musiques d'ambiance"}
                    else if(idCat == 3){category = "Les Articles"}
                    else if(idCat == 4){category = "Les Jeux"}


                divTop.innerHTML = "<h1> "+ category +"</h1>";
                divTop.innerHTML += "<h2> "+ titre +"</h2>";
                divTop.innerHTML +=  "<img src="+urlImgTop+" height=117 width=1000 alt='mon image' > "
                divTop.innerHTML += texte;

                

                


                // là je change les style css des div pour les placer en premier (order) et modifier h1 etc remettre les h1 apres
                let divTout = document.querySelectorAll("#main > div"); 

                for (let i = 0; i < divTout.length; i++) {

                    divTout[i].style.order = 2;
                    divTout[i].children[0].style.display = "inline"

                    
                }

                // toujours la meme embrouille entre la div "une" que j'ai nommé différemment et mal placé dans le dom json, et le décallage bloc_$ ù le bloc1 correspond au tableau [0] 
                let catTemp; 
                let stringGetId;
                if(arrDiv == myArr.une){ stringGetId = "jour" }else{ catTemp = idCat;stringGetId = "bloc_"+catTemp+"" } ;


                document.getElementById("intro").style.order = 0;
                document.getElementById(stringGetId).style.order = 1;

                document.getElementById(stringGetId).children[0].style.display = "none";


            }





