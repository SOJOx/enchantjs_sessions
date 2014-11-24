// ecnhant.jsを初期化
enchant();

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

Apple = Class.create(Sprite, {

		initialize: function() {

		Sprite.call(this, 16, 16);
		this.image = game.assets['./image/icon0.png'];
		
		// 横の位置をランダムに
		// Math.random() は0以上1未満の 乱数を生成する
		this.x = Math.random() * (320-16);
		this.y = 0;
		this.frame = 15; // リンゴの画像は15番目
		game.rootScene.addChild(this);
	},

	onenterframe: function() {

		// リンゴの自由落下
		this.y++;

		/****************************/

			// within() は()内の引数との当たり判定
			if (this.within(bear)) {
				
				// ゲームを停止
				game.rootScene.removeChild(this);
			}
		/****************************/
	}
});

window.onload = function() {

	// Gameオブジェクトの初期化、320x320の画面の作成
  game = new Game(320, 320);

	// ゲームのfpsを30で固定
	game.fps = 30;

	// 画像を先にロード
	game.preload('./image/bear.png', './image/icon0.png');

  // ゲームが動作開始した時のコード
	game.onload = function() {
  
		bear = new Bear(150, 280);
		apple = new Apple();
	}

  // ゲーム開始
  game.start()
}
