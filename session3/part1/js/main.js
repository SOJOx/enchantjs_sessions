// ecnhant.jsを初期化
enchant();

/****************************/

	// Spriteクラスを継承
	Bear = Class.create(Sprite, {
	
		// initializeは初期化の意味
		// オブジェクトを生成したときに自動的に実行される
		initialize: function(x, y) {

			// Spriteオブジェクトの初期化
			// bear = new Sprite(32, 32); みたいなもの
			Sprite.call(this, 32, 32);
			this.image = game.assets['./image/bear.png'];
			this.x = x;
			this.y = y;
			this.frame = 4;
			game.rootScene.addChild(this);
		},
	
		// addEventListener('enterframe', function(){})
		// と同じ機能を持つもの
		onenterframe: function() {

			// キー入力の処理
			if (game.input.left)	this.x--;
			if (game.input.right)	this.x++;
		}
	});

/****************************/

window.onload = function() {

	// Gameオブジェクトの初期化、320x320の画面の作成
  game = new Game(320, 320);

	// ゲームのfpsを30で固定
	game.fps = 30;

	/****************************/

		// 画像を先にロード
		game.preload('./image/bear.png')

	/****************************/

  // ゲームが動作開始した時のコード
	game.onload = function() {
  
		/****************************/

			bear = new Bear(150, 280);

		/****************************/

	}

  // ゲーム開始
  game.start()
}
