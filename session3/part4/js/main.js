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

		// within() は()内の引数との当たり判定
		if (this.within(bear)) {
			
			// ゲームを停止
			game.stop();
		}
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
  
		// クマを生成
		bear = new Bear(150, 280);

		// create_frame_interval がリンゴが生成される間隔
		// apple_create_frame はリンゴが生成されるまでのフレーム数
		apple_create_frame = 0;
		create_frame_interval = 120;

		// game画面のフレームに応じてイベントを発生
		game.rootScene.addEventListener('enterframe', function() {
			
			// リンゴを生成するフレームになったか？
			if (game.frame > apple_create_frame) {

				// 新しいリンゴを生成
				apple = new Apple();

				// 次のリンゴを生成する時間を入れる
				apple_create_frame = game.frame + create_frame_interval;

				// リンゴを生成する感覚を短くする
				if (create_frame_interval >= 30)
						create_frame_interval -= 5;
			} 
		});
	}

  // ゲーム開始
  game.start()
}
