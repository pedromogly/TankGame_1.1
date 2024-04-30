//Variáveis Iniciais do Jogo
var direcao;
var exibeCanvas;
var context;
var imagemMapeada;
var mapaLinhas;
var mapaColunas;
var Mapa;

//Variáveis de definição do tanque1
var tanque1Frames;
var tanque1Index;
var tanque1Rotation;
var tanque1X;
var tanque1Y;

//Variáveis de definição do tanque2 (inimigo)
var tanque2Frames;
var tanque2Index;
var tanque2Rotation;
var tanque2X;
var tanque2Y;

//Variáveis de definição da bandeira
var bandeira;
var bandeiraIndex;
var bandeiraX;
var bandeiraY;

//Variáveis de pontuação
var pontosjog = 0;
var pontoscomp = 0;

//Variáveis para os sons
var som;
var musica;

window.addEventListener('load', canvasApl, false);

function canvasApl() {
	exibeCanvas = document.getElementById("canvas");
	exibeCanvas.addEventListener('click',eventoClick,false);
	context = exibeCanvas.getContext("2d");
	imagemMapeada = new Image();
	imagemMapeada.addEventListener('load',iniciar, false);
	imagemMapeada.src="imagens/tanks.png";
	
	// Som
	som = document.getElementById("som");
	musica = document.getElementById("musica");
	
	//Variáveis de definição do mapa
	mapaLinhas = 15;
	mapaColunas = 15;
	Mapa = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,20,0,0,0,0,0,20,0,0,0,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,20,0,0]
	, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	, [0,0,0,0,0,0,20,0,0,0,0,0,0,0,0]
	];
	
	//Variáveis de definição do tanque1
		tanque1Frames=[1,2,3,4,5,6,7,8];
		tanque1Index=0;
		tanque1Rotation=90;
		tanque1X=Math.floor(Math.random() * 400);
		tanque1Y=Math.floor(Math.random() * 400);
		direcao=1;
		
	//Variáveis de definição do tanque2 (inimigo)
		tanque2Frames=[9,10,11,12,13,14,15,16];
		tanque2Index=0;
		tanque2Rotation=90;
		tanque2X=Math.floor(Math.random() * 400);
		tanque2Y=Math.floor(Math.random() * 400);
		
	//Variáveis de definição da bandeira
		bandeira = [0,21,21,21,21,0];
		bandeiraIndex=0;
		bandeiraX=Math.floor(Math.random() * 400);
		bandeiraY=Math.floor(Math.random() * 400);
}

function iniciar() {
	musica.loop = true;
	musica.play();
	setInterval(gameLoop, 50 );
}

// GameLoop
function gameLoop() {
 desenhaTela();
 atualizarTanque1();
 desenhaInimigo();
 detectandoColisaoBandeira();
 desenhaTank();
 desenhaBandeira();
 atualizarInimigo();
 desenhaTexto();
 gameOver();
}

//Função responsavel em desenhar o mapa no canvas
function desenhaTela() {
	for (var linha=0;linha<mapaLinhas;linha++) {
		for (var coluna=0;coluna<mapaColunas;coluna++){
			var mapaId = Mapa[linha][coluna];
			var sourceX = Math.floor(mapaId % 8) *32;
			var sourceY = Math.floor(mapaId / 8) *32;
			context.drawImage(imagemMapeada, sourceX,
			sourceY,32,32,coluna*32,linha*32,32,32);
		}
	}
}

//Função responsavel em desenhar o tanque1 no mapa
function desenhaTank() {
	angleInRadians =tanque1Rotation * Math.PI / 180;
	context.translate(tanque1X+16, tanque1Y+16);
	context.rotate(angleInRadians);
	var sourceX=Math.floor(tanque1Frames[tanque1Index] % 8) *32;
	var sourceY=Math.floor(tanque1Frames[tanque1Index] / 8) *32;
	context.drawImage(imagemMapeada, sourceX, sourceY,32,32,-16,-16,32,32);
	context.setTransform(1,0,0,1,0,0);
	
	tanque1Index++;
	if (tanque1Index ==tanque1Frames.length) {
		tanque1Index=0;
	}
}

//Função responsável em desenhar o tanque2 (inimigo no mapa
function desenhaInimigo() {
	var angleInRadians2 =tanque2Rotation * Math.PI / 180;
	context.translate(tanque2X+16, tanque2Y+16);
	context.rotate(angleInRadians2);
	
	var InimigoX=Math.floor(tanque2Frames[tanque2Index] % 8) *32;
	var InimigoY=Math.floor(tanque2Frames[tanque2Index] / 8) *32;
	
	context.drawImage(imagemMapeada, InimigoX, InimigoY,32,32,-16,-16,32,32);
	context.setTransform(1,0,0,1,0,0);
	
	tanque2Index++;
	if (tanque2Index ==tanque2Frames.length) {
		tanque2Index=0;
	}
}


//Função executada quando a mapa é clicado
function eventoClick() {
	direcao++;
	
	if (direcao==5) {
		direcao=1;
	}
}

function atualizarTanque1(){
	//Identifica a direção de movimentação
	if (direcao==1) {
		tanque1Rotation=90;
		tanque1X=tanque1X+2;
		} else if (direcao==2) {
		tanque1Rotation=180;
		tanque1Y=tanque1Y+2;
		} else if (direcao==3) {
		tanque1Rotation=270;
		tanque1X=tanque1X-2;
		} else if (direcao==4) {
		tanque1Rotation=0;
		tanque1Y=tanque1Y-2;
		}	
		
		// Limita movimentação
	if (tanque1X>=416)
		direcao=3;
	else if (tanque1X<=0)
		direcao=1;
		
	if (tanque1Y<=0)
		direcao=2;
	else if (tanque1Y>=416)
		direcai=4;
	}
	
//Função responsavel em desenhar a bandeira no mapa
function desenhaBandeira() {
	context.translate(bandeiraX+16, bandeiraY+16);
	var BandeiraX=Math.floor(bandeira[bandeiraIndex] % 8) *32;
	var BandeiraY=Math.floor(bandeira[bandeiraIndex] / 8) *32;

	context.drawImage(imagemMapeada, BandeiraX, BandeiraY,32,32,-16,-16,32,32);
	context.setTransform(1,0,0,1,0,0);
	
	bandeiraIndex++;
	if (bandeiraIndex ==bandeira.length) {
		bandeiraIndex=0;
	}
}

//Atualizar inimigo 
function atualizarInimigo() {
	//Inteligência artificial
	if (tanque2X>bandeiraX) {
		tanque2X-=1;
		tanque2Rotation=270;
	} else if (tanque2X<bandeiraX) {
		tanque2X+=1;
		tanque2Rotation=90;
	} else if (tanque2Y>bandeiraY) {
		tanque2Y-=1;
		tanque2Rotation=0;
	} else if (tanque2Y<bandeiraY) {
		tanque2Y+=1;
		tanque2Rotation=180;
	}
}

//Detectando a colisão do tanque inimigo com a bandeira 
function detectandoColisaoBandeira() {
	//Detecta colisão da bandeira com o inimigo
 	if ((bandeiraX==tanque2X) && (bandeiraY==tanque2Y)) {
		bandeiraX=Math.floor(Math.random() * 400);
		BandeiraY=Math.floor(Math.random() * 400);
		pontoscomp++;
		som.play();
	}
	//Detecta colisão da bandeira com o tanque 1 
	if (((bandeiraX + 16) > tanque1X && bandeiraX < (tanque1X + 16)) && ((bandeiraY
	+ 16) > tanque1Y && bandeiraY < (tanque1Y + 16))) {
	bandeiraX=Math.floor(Math.random() * 400);
	bandeiraY=Math.floor(Math.random() * 400);
	pontosjog++;
	som.play();
	}
}

//Desenha o texto no canvas
function desenhaTexto() {
	context.fillStyle = "rbg(250, 250, 250)";
	context.font = "16px BRAESIDE";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText("Jogador: " + pontosjog, 5, 5);
	context.fillText("Computador: " + pontoscomp, 330, 5);
}

// gameOver()
function gameOver() {
	if (pontosjog==10) {
		musica.pause();
		alert ("Parabéns você ganhou!!")
		window.location.reload();
	}
	
	if (pontoscomp==10) {
		musica.pause();
		alert ("Você perdeu!!")
		window.location.reload();
	}
}

