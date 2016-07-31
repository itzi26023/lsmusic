function LSMusic(){

	var MusicRecommender = {

		response:'',
		searchType: '',

		currentArtistsID: '',

		numElements: 0,
		arrayAlbums: [],
		arrayArtistsID: [],
		arrayArtistsImag: [],
		arrayAlbumsImag: [],
		idSelect:'',

		array: [],
		arraySuggestion: [],
		arrayMostPopular: [],



		addAlbumEntry: function (albumID, albumName) {
			this.arrayAlbums.push({
				albumID: albumID,
				albumName: albumName,
			});
		},

		addEntry: function (songPreviewUrl, songID, albumID, artistID, albumImag, albumName, artistsName, trackName ,duration) {
			this.array.push({
				songPreviewUrl: songPreviewUrl,
				songID: songID,
				albumID: albumID,
				artistID: artistID,
				albumImag: albumImag,
				albumName: albumName,
				artistsName: artistsName,
				trackName: trackName,
				duration: duration,
				count: 0,
			});
		},

		addMostPopularEntry: function (songPreviewUrl, songID, albumID, artistID, albumImag, albumName, artistsName, trackName ,duration) {
			this.arrayMostPopular.push({
				songPreviewUrl: songPreviewUrl,
				songID: songID,
				albumID: albumID,
				artistID: artistID,
				albumImag: albumImag,
				albumName: albumName,
				artistsName: artistsName,
				trackName: trackName,
				duration: duration,
			});
		},
		addSuggestionEntry: function (songPreviewUrl, songID, albumID, artistID, albumImag, albumName, artistsName, trackName,duration) {
			this.arraySuggestion.push({
				songPreviewUrl: songPreviewUrl,
				songID: songID,
				albumID: albumID,
				artistID: artistID,
				albumImag: albumImag,
				albumName: albumName,
				artistsName: artistsName,
				trackName: trackName,
				duration: duration,

			});
		},



		getNumElements: function(){
			return this.numElements;
		},

		getResponse: function(){
			return this.response;
		},

		getArray: function(){
			return this.array;
		},

		getArrayArtistsID: function(){
			return this.arrayArtistsID;
		},

		//Limpia los resultados de la búsqueda
		cleanSearch: function(){
			document.getElementById('list').innerHTML = "";
		},

		//limpia los resultados de las sugerencias
		cleanListSuggestion: function(){
			document.getElementById('listaRecom').innerHTML = "";
		},

		//Devuelve el tipo de la busqueda a una variable global. El tipo puede ser artist, album o track
		findTypeInfo: function(){
			if(document.getElementById("trackSelected").checked == true){
				this.searchType = 'track';
			}
			if(document.getElementById("artistSelected").checked == true){
				this.searchType = 'artist';
			}
			if(document.getElementById("albumSelected").checked == true){
				this.searchType = 'album';
			}

			return this.searchType;
		},

		//Busca en función de lo que pone el usuario en el buscador y el tipo del información que busca
		search: function(infoSearchEngine, searchType){

			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://api.spotify.com/v1/search?q="+ infoSearchEngine +"&type="+ searchType + "&market=ES", false);
			xhr.send();

			var json_response = xhr.responseText;
			this.response = JSON.parse(json_response);
		},

		//Muestra las canciones pop más populares del 2010 al 2015
		mostPopular: function(){
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://api.spotify.com/v1/search?type=track&q=genre:pop+year:2010-2015&market=ES", false);
			xhr.send();

			var json_response = xhr.responseText;
			doc = JSON.parse(json_response);

			var a = document.createElement('span');

			this.numElements = doc.tracks.items.length;


			for (var i = 0; i < this.numElements; i++) {
				var text = doc.tracks.items[i].name;
				var albumImag = doc.tracks.items[i].album.images[1].url;
				var Artists = '';
				a.innerHTML +=
					"<div class='hovereffect'> " +
					"<img  class='img-responsive' src='" + albumImag + "'>" +
					"<div class='overlay'> " +
					"<h2>" + text + "</h2>"+
					"<p class='set1'> " +
					"<a href='#'>" +
					"<i id = 'trackadd"+i+"' class='fa fa-plus'></i>" +
					"</a>" +
					"</p> " +
					"<hr>"+
					"<p class='set2'> " +
					"<a href='#'>" +
					"<i id = 'mosttrack"+i+"' class='fa fa-play'></i>" +
					"</a>" +
					"</p>" +
					"</div>" +
					"</div>" ;

				if (doc.tracks.items[i].artists.length > 1){
					for (var j = 0; j < doc.tracks.items[i].artists.length; j++) {
						if (j != doc.tracks.items[i].artists.length - 1) {
							Artists += doc.tracks.items[i].artists[j].name + " & ";
						} else {
							Artists += doc.tracks.items[i].artists[j].name;
						}
					}
				}else{
					Artists = doc.tracks.items[i].artists[0].name;
				}

				this.addMostPopularEntry(doc.tracks.items[i].preview_url,
				 doc.tracks.items[i].id,
				 doc.tracks.items[i].album.id ,
				 doc.tracks.items[i].artists[0].id,
				 doc.tracks.items[i].album.images[1].url,
				 doc.tracks.items[i].album.name,
				 Artists,
				 doc.tracks.items[i].name,
				 doc.tracks.items[i].duration_ms);
			}
			document.getElementById('list').appendChild(a);
			return this.numElements;
		},
		//Printa la información que ha buscado el usuario
		list: function(){

			var result = document.createElement('span');
			var searchType = this.findTypeInfo();

			//Si son canciones
			if(searchType == 'track') {
				this.numElements = this.response.tracks.items.length;


				for (var i = 0; i < this.numElements; i++) {
					var text = this.response.tracks.items[i].name;
					var albumImag = this.response.tracks.items[i].album.images[1].url;
					var Artists = '';
					result.innerHTML +=
						"<div class='hovereffect'> " +
						"<img  class='img-responsive' src='" + albumImag + "'>" +
						"<div class='overlay'> " +
						"<h2>" + text + "</h2>"+
						"<p class='set1'> " +
						"<a href='#'>" +
						"<i id = 'trackadd"+i+"' class='fa fa-plus'></i>" +
						"</a>" +
						"</p>" +
						"<hr>" +
						"<p class='set2'> " +
						"<a href='#'>" +
						"<i id = 'playtrack"+i+"' class='fa fa-play'></i>" +
						"</a>" +
						"</p>" +
						"</div>" +
						"</div>" ;

					if (this.response.tracks.items[i].artists.length > 1){
						for (var j = 0; j < this.response.tracks.items[i].artists.length; j++) {
							if (j != this.response.tracks.items[i].artists.length - 1) {
								Artists += this.response.tracks.items[i].artists[j].name + " & ";
							} else {
								Artists += this.response.tracks.items[i].artists[j].name;
							}
						}
					}else{
						Artists = this.response.tracks.items[i].artists[0].name;
					}

					this.currentArtistsID = this.response.tracks.items[i].artists[0].id;

					this.addEntry(this.response.tracks.items[i].preview_url,
						this.response.tracks.items[i].id,
						this.response.tracks.items[i].album.id ,
						this.response.tracks.items[i].artists[0].id,
						this.response.tracks.items[i].album.images[1].url,
						this.response.tracks.items[i].album.name,
						Artists,
						this.response.tracks.items[i].name,
						this.response.tracks.items[i].duration_ms);
				}
			}

			// Si son artistas
			if(searchType == 'artist'){
				this.currentArtistsID = this.response.artists.items[0].id;
				this.numElements = this.response.artists.items.length;

				for(var i = 0; i < this.numElements; i++){
					var text = this.response.artists.items[i].name;
					var albumImag = '';
					if(this.response.artists.items[i].images == ""){
						albumImag = "imag/noimage.jpg";
						this.arrayArtistsImag[i] = albumImag;
					}else {
						albumImag = this.response.artists.items[i].images[2].url;
						this.arrayArtistsImag[i] = this.response.artists.items[i].images[1].url;
					}
					result.innerHTML +=
							"<div class='hovereffect'> " +
							"<img  class='img-responsive' src='" + albumImag + "'>" +
							"<div class='overlay'> " +
							"<h2>" + text + "</h2>"+
							"<p class='set1'> " +
							"<a href='#'>" +
							"<i id = 'trackadd"+i+"' class='fa fa-plus'></i>" +
							"</a>" +
							"</p> " +
							"</div>" +
							"</div>" ;
						this.arrayArtistsID[i] = this.response.artists.items[i].id;
				}
			}
			//Si son albumes
			if(searchType == 'album'){

				this.numElements = this.response.albums.items.length;

				for(var i = 0; i < this.numElements; i++){
					var text = this.response.albums.items[i].name;
					var albumImag = this.response.albums.items[i].images[1].url;
					result.innerHTML +=
							"<div class='hovereffect'> " +
							"<img  class='img-responsive' src='" + albumImag + "'>" +
							"<div class='overlay'> " +
							"<h2>" + text + "</h2>"+
							"<p class='set1'> " +
							"<a href='#'>" +
							"<i id = 'trackadd"+i+"' class='fa fa-plus'></i>" +
							"</a>" +
							"</div>" +
							"</div>" ;

					this.addAlbumEntry(this.response.albums.items[i].id, this.response.albums.items[i].name);
					this.arrayAlbumsImag[i] = this.response.albums.items[i].images[1].url;
				}
			}
			document.getElementById('list').appendChild(result);
		},

		//Busca los artistas relacionados con el artista buscado por el usuario
		findRelatedAritsts : function(artistID){

			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://api.spotify.com/v1/artists/"+ artistID +"/related-artists", false);
			xhr.send();
			var json_response = xhr.responseText;
			var doc = JSON.parse(json_response);
			if(doc.artists[0] == undefined){
				alert("No se ha encontrado ningún artista relacionado");
			}
			else {
				for (i = 0; i < doc.artists.length; i++) {
					var idRelatedArtist = doc.artists[i].id;
					this.findTopArtistTrack(idRelatedArtist);
				}
			}
			return doc.artists.length;
		},

		//Busca la canción más conocida del artist relacionado que ha encontrado
		findTopArtistTrack : function(artistID){

			var lista = document.getElementById('listaRecom');

			//Se obtienen los artistas relacionados con el artista buscado
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://api.spotify.com/v1/artists/"+ artistID +"/top-tracks?country=ES", false);
			xhr.send();
			var json_response = xhr.responseText;
			var doc = JSON.parse(json_response);

			var suggestionImage = doc.tracks[0].album.images[1].url;
			var suggestionTrack = doc.tracks[0].name;
			var suggestionArtists = "";

			if (doc.tracks[0].artists.length > 1){
				for (var i = 0; i < doc.tracks[0].artists.length; i++) {
					if (i != doc.tracks[0].artists.length - 1) {
						suggestionArtists += doc.tracks[0].artists[i].name + " & ";
					} else {
						suggestionArtists += doc.tracks[0].artists[i].name;
					}
				}
			}else{
				suggestionArtists = doc.tracks[0].artists[0].name;
			}
			var i = 0;
			if(MusicRecommender.arraySuggestion.length == 0){
				i = 0;
			}else{
				i = MusicRecommender.arraySuggestion.length;
			}

			var result = document.createElement('span');
				result.innerHTML +=
					"<div class='hovereffect'> " +
					"<img  class='img-responsive' src='" + suggestionImage + "'>" +
					"<div class='overlay'> " +
					"<h2>" + suggestionTrack + "</h2>"+
					"<p class='set1'> " +
					"<a href='#'>" +
					"<i id = 'suggtrack"+i+"' class='fa fa-play'></i>" +
					"</a>" +
					"</p>" +
					"</div>" +
					"</div>" ;


			this.addSuggestionEntry(doc.tracks[0].preview_url,
				doc.tracks[0].id,
				doc.tracks[0].album.id ,
				doc.tracks[0].artists[0].id,
				doc.tracks[0].album.images[1].url,
				doc.tracks[0].album.name,
				suggestionArtists,
				doc.tracks[0].name,
				doc.tracks[0].duration_ms);

			document.getElementById('listaRecom').appendChild(result);


		},

		//Busca las canciones más destacadas de un artista
		findArtistTrack: function(){

			//Eliminamos los resultados de busquedas anteriores
			this.cleanSearch();

			var idButton = event.target.id;
			idButton = idButton.substr(8);
			var selected = this.arrayArtistsID[idButton];

			//Se obtienen los artistas relacionados con el artista buscado
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://api.spotify.com/v1/artists/"+ selected +"/top-tracks?country=ES", false);
			xhr.send();
			var json_response = xhr.responseText;
			var doc = JSON.parse(json_response);

			var result = document.createElement('span');

			for(var i = 0; i < doc.tracks.length; i++){

				var text = doc.tracks[i].name;
				var albumImag = doc.tracks[i].album.images[1].url;
				result.innerHTML +=
					"<div class='hovereffect'> " +
					"<img  class='img-responsive' src='" + albumImag + "'>" +
					"<div class='overlay'> " +
					"<h2>" + text + "</h2>"+
					"<p class='set1'> " +
					"<a href='#'>" +
					"<i class='fa fa-plus'></i>" +
					"</a>" +
					"</p> " +
					"<hr>"+
					"<p class='set2'> " +
					"<a href='#'>" +
					"<i class='fa fa-play'></i>" +
					"</a>" +
					"</p>" +
					"</div>" +
					"</div>" ;
			}

			document.getElementById('list').appendChild(result);
		},

		//Expande un artista y busca sus albums
		expandArtist: function(artistID){

			//Eliminamos los resultados de busquedas anteriores
			this.cleanSearch();

			var idButton = event.target.id;
			idButton = idButton.substr(8);
			var selected = artistID[idButton];

			//Obtenemos los albums del artista
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://api.spotify.com/v1/artists/"+ selected +"/albums?album_type=album", false);
			xhr.send();
			var json_response = xhr.responseText;
			var doc = JSON.parse(json_response);

			if(doc.items.length == 0){
				this.findArtistTrack();
			}else{
				var result = document.createElement('span');

				for(var i = 0; i < doc.items.length; i++){

					var text = doc.items[i].name;
					var albumImag = doc.items[i].images[1].url;
					result.innerHTML +=
						"<div class='hovereffect'> " +
						"<img  class='img-responsive' src='" + albumImag + "'>" +
						"<div class='overlay'> " +
						"<h2>" + text + "</h2>"+
						"<p class='set1'> " +
						"<a href='#'>" +
						"<i id = 'trackadd"+i+"' class='fa fa-plus'></i>" +
						"</a>" +
						"</p> " +
						"</div>" +
						"</div>" ;
					this.addAlbumEntry(doc.items[i].id, doc.items[i].name);
					this.arrayAlbumsImag[i] = doc.items[i].images[1].url;

				}

				document.getElementById('list').appendChild(result);
				return doc;
			}



		},

		//Expande un album y busca sus canciones
		expandAlbum: function(){

			//Eliminamos los resultados de busquedas anteriores
			this.cleanSearch();

			var idButton = event.target.id;
			idButton = idButton.substr(8);
			this.idSelect = this.arrayAlbums[idButton]['albumID'];

			//Obtenemos los albums del artista
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://api.spotify.com/v1/albums/"+ this.idSelect  +"/tracks?market=ES", false);
			xhr.send();
			var json_response = xhr.responseText;
			var doc = JSON.parse(json_response);

			var Artists = '';
			var result = document.createElement('span');

			for(var i = 0; i < doc.items.length; i++){

				var text = doc.items[i].name;
				var albumImag = this.arrayAlbumsImag[idButton];

				result.innerHTML +=
					"<div class='hovereffect'> " +
					"<img  class='img-responsive' src='" + albumImag + "'>" +
					"<div class='overlay'> " +
					"<h2>" + text + "</h2>"+
					"<p class='set1'> " +
					"<a href='#'>" +
					"<i id = 'trackadd"+i+"' class='fa fa-plus'></i>" +
					"</a>" +
					"</p> " +
					"<hr>"+
					"<p class='set2'> " +
					"<a href='#'>" +
					"<i id = 'playtrack"+i+"' class='fa fa-play'></i>" +
					"</a>" +
					"</p>" +
					"</div>" +
					"</div>" ;

				if (doc.items[i].artists.length > 1){
					for (var j = 0; j < doc.items[i].artists.length; j++) {
						if (j != doc.items[i].artists.length - 1) {
							Artists += doc.items[i].artists[j].name + " & ";
						} else {
							Artists += doc.items[i].artists[j].name;
						}
					}
				}else{
					Artists = doc.items[i].artists[0].name;
				}

				this.addEntry(doc.items[i].preview_url,
					doc.items[i].id, this.idSelect ,
					doc.items[i].artists[0].id,
					this.arrayAlbumsImag[idButton],
					this.arrayAlbums[idButton]['albumName'],
					Artists,
					doc.items[i].name,
					doc.items[i].duration_ms);

			}

			document.getElementById('list').appendChild(result);
			return doc;
		},

		//Printa la lista de canciones del usuario guardadas en localstorage
		playlist: function(){
			var all = Data.getAll();
			document.getElementById('listTrack').innerHTML = "";
			var info = document.createElement("table");

			for(var i = 0; i < localStorage.length; i++){
				var track = all[i]['trackName'] + " - " + all[i]['artistsName'];
				info.innerHTML += "<tr id='element'><th id= 'listTrack"+i+"' class='fa fa-play'></th><th>" + track + "</th></tr>";
			}
			document.getElementById('listTrack').appendChild(info);

		},

		//Muesta los detalles de la canción que se está escuchando
		detail: function(idButton, type){


			if(type == "normal"){
				var minutes = Math.floor( MusicRecommender.array[idButton]['duration'] / 60 / 1000);
				var seconds = MusicRecommender.array[idButton]['duration'] % 60;

				//Anteponiendo un 0 a los minutos si son menos de 10
				minutes = minutes < 10 ? '0' + minutes : minutes;

				//Anteponiendo un 0 a los segundos si son menos de 10
				seconds = seconds < 10 ? '0' + seconds : seconds;

				var duration = minutes + ":" + seconds;  // 161:30
				document.getElementById('info').innerHTML = "";
				var info = document.createElement("span");

				info.innerHTML += "Album: " + MusicRecommender.array[idButton]['albumName'] +
					"<br>"+
					"<br>"+
					"Artist: " + MusicRecommender.array[idButton]['artistsName'] +
					"<br>"+
					"<br>"+
					" Track: " + MusicRecommender.array[idButton]['trackName'] +
					"<br>"+
					"<br>"+
					" Duration: " + duration;

				document.getElementById('info').appendChild(info);
			}
			if(type == "suggestion"){
				var minutes = Math.floor( MusicRecommender.arraySuggestion[idButton]['duration'] / 60 / 1000);
				var seconds = MusicRecommender.arraySuggestion[idButton]['duration'] % 60;

				//Anteponiendo un 0 a los minutos si son menos de 10
				minutes = minutes < 10 ? '0' + minutes : minutes;

				//Anteponiendo un 0 a los segundos si son menos de 10
				seconds = seconds < 10 ? '0' + seconds : seconds;

				var duration = minutes + ":" + seconds;  // 161:30
				document.getElementById('info').innerHTML = "";
				var info = document.createElement("span");
				info.innerHTML += "Album: " + MusicRecommender.arraySuggestion[idButton]['albumName'] +
					"<br>"+
					"<br>"+
					"Artist: " + MusicRecommender.arraySuggestion[idButton]['artistsName'] +
					"<br>"+
					"<br>"+
					" Track: " + MusicRecommender.arraySuggestion[idButton]['trackName'] +
					"<br>"+
					"<br>"+
					" Duration: " + duration;
				document.getElementById('info').appendChild(info);
			}

			if(type == "mostPopular"){
				var minutes = Math.floor( MusicRecommender.arrayMostPopular[idButton]['duration'] / 60 / 1000);
				var seconds = MusicRecommender.arrayMostPopular[idButton]['duration'] % 60;

				//Anteponiendo un 0 a los minutos si son menos de 10
				minutes = minutes < 10 ? '0' + minutes : minutes;

				//Anteponiendo un 0 a los segundos si son menos de 10
				seconds = seconds < 10 ? '0' + seconds : seconds;

				var duration = minutes + ":" + seconds;  // 161:30
				document.getElementById('info').innerHTML = "";
				var info = document.createElement("span");
				info.innerHTML += "Album: " + MusicRecommender.arrayMostPopular[idButton]['albumName'] +
					"<br>"+
					"<br>"+
					"Artist: " + MusicRecommender.arrayMostPopular[idButton]['artistsName'] +
					"<br>"+
					"<br>"+
					" Track: " + MusicRecommender.arrayMostPopular[idButton]['trackName'] +
					"<br>"+
					"<br>"+
					" Duration: " + duration;
				document.getElementById('info').appendChild(info);
			}
			if(type == "myList"){
				var all = Data.getAll();
				var minutes = Math.floor( all[idButton]['duration'] / 60 / 1000);
				var seconds = all[idButton]['duration'] % 60;

				//Anteponiendo un 0 a los minutos si son menos de 10
				minutes = minutes < 10 ? '0' + minutes : minutes;

				//Anteponiendo un 0 a los segundos si son menos de 10
				seconds = seconds < 10 ? '0' + seconds : seconds;

				var duration = minutes + ":" + seconds;  // 161:30
				document.getElementById('info').innerHTML = "";
				var info = document.createElement("span");
				info.innerHTML += "Album: " + all[idButton]['albumName'] +
					"<br>"+
					"<br>"+
					"Artist: " + all[idButton]['artistsName'] +
					"<br>"+
					"<br>"+
					" Track: " + all[idButton]['trackName'] +
					"<br>"+
					"<br>"+
					" Duration: " + duration;
				document.getElementById('info').appendChild(info);
			}
		}
	}

	var Player = {

		//Añade una canción a la lista del usuario
		addSong: function (type) {
			var idButton = event.target.id;
			idButton = idButton.substr(8);

			var all = Data.getAll();
			if(type == "mostPopular"){
				Data.save(MusicRecommender.arrayMostPopular[idButton]['songID'],MusicRecommender.arrayMostPopular[idButton]);
			}else{
				Data.save(MusicRecommender.array[idButton]['songID'],MusicRecommender.array[idButton]);
			}

			MusicRecommender.playlist(all);
			Listeners.playMyListButtonListener(localStorage.length);

		},

		//Reproduce la cancion seleccionada
		playSong: function(type){
			document.getElementById('image').innerHTML = "";

			var idButton = event.target.id;
			idButton = idButton.substr(9);

			var reproductor = document.createElement("span");
			var all = Data.getAll();

			if(type == "suggestion"){
				Data.save(MusicRecommender.arraySuggestion[idButton]['songID'],MusicRecommender.arraySuggestion[idButton]);
				albumImag = MusicRecommender.arraySuggestion[idButton]['albumImag']
				reproductor.innerHTML += "<img src='" + albumImag + "'>";
				var preview = MusicRecommender.arraySuggestion[idButton]['songPreviewUrl'];
				var music = document.getElementById('musicPlayer');
				music.src = preview;
				MusicRecommender.detail(idButton, "suggestion");
			}

			if(type == "normal"){
				Data.save(MusicRecommender.array[idButton]['songID'],MusicRecommender.array[idButton]);
				albumImag = MusicRecommender.array[idButton]['albumImag'];
				reproductor.innerHTML += "<img src='" + albumImag + "'>";
				var preview = MusicRecommender.array[idButton]['songPreviewUrl'];
				var music = document.getElementById('musicPlayer');
				music.src = preview;
				MusicRecommender.detail(idButton, "normal");
			}

			if(type == "mostPopular"){
				Data.save(MusicRecommender.arrayMostPopular[idButton]['songID'],MusicRecommender.arrayMostPopular[idButton]);
				albumImag = MusicRecommender.arrayMostPopular[idButton]['albumImag'];
				reproductor.innerHTML += "<img src='" + albumImag + "'>";
				var preview = MusicRecommender.arrayMostPopular[idButton]['songPreviewUrl'];
				var music = document.getElementById('musicPlayer');
				music.src = preview;
				MusicRecommender.detail(idButton, "mostPopular");
			}

			if(type == "myList"){
				albumImag = all[idButton]['albumImag'];
				reproductor.innerHTML += "<img src='" + albumImag + "'>";
				var preview =all[idButton]['songPreviewUrl'];
				var music = document.getElementById('musicPlayer');
				music.src = preview;
				MusicRecommender.detail(idButton, "myList");
			}

			MusicRecommender.playlist(all);
			Listeners.playMyListButtonListener(localStorage.length);

			document.getElementById('image').appendChild(reproductor);
		}
	}

	var Data = {

		//Guarda un objeto en localstorage. Si no estaba antes lo añade, y si estaba, incrementa en atributo count para saber cuantas veces se reproduce
		save: function(id, data){

			var result = this.get(id);

			if(result != null){
				result.count++;
				localStorage.setItem(id, JSON.stringify(result));
			}
			else{
				localStorage.setItem(id, JSON.stringify(data));
			}
		},

		//Devuelve un objeto en concreto
		get : function(id){
			var result = localStorage.getItem(id);
			return JSON.parse(result);
		},

		//Devuelve todos los elementos guardados en el localstorage
		getAll : function(){
			var result = [];
			var element = '';
			for(var i = 0; i < localStorage.length; i++){
				element = localStorage.getItem(localStorage.key(i))
				result.push(JSON.parse(element));
			}
			return result;
		}
	}


	var Listeners = {
		jsonArtists: '',
		jsonAlbums: '',


		mostPopularListener: function(num){

			for(var i = 0; i < num; i++){
				document.getElementById('mosttrack' + i).addEventListener('click', function (){
					Listeners.playMostPopularButtonListener(num);
					Listeners.moreButtonListener(num, "mostPopular");
				});
			}

		},

		searchListener : function(){

			document.getElementById('searchbtn').addEventListener('click', function (){

				MusicRecommender.cleanSearch();
				MusicRecommender.cleanListSuggestion();
				MusicRecommender.array = [];
				MusicRecommender.arraySuggestion = [];
				MusicRecommender.arrayAlbums = [];


				var typeSearch = MusicRecommender.findTypeInfo();
				MusicRecommender.search(document.getElementById('infoSearch').value, typeSearch);
				MusicRecommender.list();


				last = MusicRecommender.array.length;
				if(typeSearch == "track" ){
					Listeners.playButtonListener("track");
					Listeners.moreButtonListener(MusicRecommender.getNumElements(), "noPopular");
					var numRelated = MusicRecommender.findRelatedAritsts(MusicRecommender.array[last -1]['artistID']);
					Listeners.playSuggestionButtonListener(numRelated);
				}
				if(typeSearch == "artist"){
					var numRelated = MusicRecommender.findRelatedAritsts(MusicRecommender.currentArtistsID);
					Listeners.playSuggestionButtonListener(numRelated);
					Listeners.moreButtonListener(MusicRecommender.getNumElements(), "noPopular");
				}
				if(typeSearch == "album"){
					Listeners.moreButtonListener(MusicRecommender.getNumElements(), "noPopular");
				}



			});
		},

		moreButtonListener : function(length, mostP){

				for(var i = 0; i < length; i++){
					document.getElementById('trackadd' + i).addEventListener('click', function () {
					var jsonSearch = MusicRecommender.getResponse();

					var type = MusicRecommender.findTypeInfo();
					if(mostP == "mostPopular"){
+						Player.addSong("mostPopular");
					}
					if(mostP == "track" && type == "album"){
						Player.addSong();
					}
					if(mostP == "track" && type == "artist"){
						Player.addSong();
					}
					if (type == 'track' && mostP == 'noPopular' ) {
						Player.addSong();
					}
					if (type == 'artist' && mostP == 'noPopular') {
						var artistID  = MusicRecommender.getArrayArtistsID();
						var jsonArtists= MusicRecommender.expandArtist(artistID);
						Listeners.expandButtonListener(jsonArtists);

					}
					if (type == 'album' && mostP == 'noPopular') {
						var jsonAlbums = MusicRecommender.expandAlbum();
						last = MusicRecommender.array.length;
						var numRelated = MusicRecommender.findRelatedAritsts(MusicRecommender.array[last -1]['artistID']);
						Listeners.playSuggestionButtonListener(numRelated);
						Listeners.playButtonListener("album",jsonAlbums);
						Listeners.moreButtonListener(jsonAlbums.items.length, "track");
					}
				});
			}
		},

		expandButtonListener: function(json){
			var numElements = json.items.length;
			for(i = 0; i < numElements; i++){
				var bt = document.getElementById('trackadd'+i);
				bt.addEventListener('click', function(){
				//	var jsonSearch = MusicRecommender.getResponse();
					var jsonAlbumList = "";
					if(MusicRecommender.findTypeInfo() == "artist"){
						var jsonAlbums = MusicRecommender.expandAlbum();
						Listeners.moreButtonListener(jsonAlbums.items.length, "track");
					}
					Listeners.playButtonListener("album",json);
				});
			}
		},

		playButtonListener: function(type, json){

			//json1 es el json con los albums de un artista
			var jsonSearch = MusicRecommender.getResponse();
			var length = 0;
			if(type == "artist" || type == "album"){
				//json2 es el json con las canciones de un album
				length = json.items.length;
			}else{
				length = MusicRecommender.getNumElements();
			}
			for(i = 0; i < length; i++){
				var bt = document.getElementById('playtrack'+i);
				bt.addEventListener('click', function(){
					Player.playSong("normal");
				});
			}
		},

		playSuggestionButtonListener: function(length){

			//json1 es el json con los albums de un artista
			var jsonSearch = MusicRecommender.getResponse();

			for(i = 0; i < length; i++) {
				var bt = document.getElementById('suggtrack' + i);
				bt.addEventListener('click', function () {
					Player.playSong("suggestion");

				});
			}
		},

		playMyListButtonListener: function(length){

			for(i = 0; i < length; i++){
				var bt = document.getElementById('listTrack'+i);
				bt.addEventListener('click', function(){
					Player.playSong("myList");
				});
			}
		},

		playMostPopularButtonListener: function(length){
			for(i = 0; i < length; i++){
				var bt = document.getElementById('mosttrack'+i);
				bt.addEventListener('click', function(){
					Player.playSong("mostPopular");
				});
			}
		}

	}

	Listeners.searchListener();
	var num = MusicRecommender.mostPopular();
	Listeners.mostPopularListener(num);
}

//Asignamos listeners
document.addEventListener("DOMContentLoaded",LSMusic(),false);
