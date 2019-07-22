# はじめに
WebAssemblyには以前から興味があり，LLVMを自分でフルビルドして試してみたことはあった．
この時WebAssembly targetはLLVMの中ではexperimentalなものだったのだが，3月20日にLLVM 8.0がリリースされ，
これによりLLVMを野良ビルドせずとも，WebAssemblyをターゲットにしたプログラムを"LLVMを使って"出力できるようになった．
LLVMは近年盛んに使われているコンパイラ基盤で，Low Level Virtual Machineの略だ(現在は特に何の頭文字でもないとしているそうだが)．
LLVMを使用することにより，ソースコードを字句解析・意味解析し，LLVMの中間表現を生成し，
それをLLVMに渡すだけで様々な(LLVMが対応している)アーキテクチャ向けの実行バイナリを出力することができるようになる(そしてこれは最適化されたものになる)．
LLVMを用いた有名なコンパイラにはclangやRust(rustc)などがあり，これらのコンパイラは実際にあらゆるアーキテクチャ向けの実行バイナリをコンパイルオプションに指定するだけで出力できる．
このLLVMのターゲットにWebAssemblyが加わったことで，CやC++，Rustといった様々なプログラミング言語で記述したプログラムを「ブラウザ上で」「高速に」動かすことが可能になる．
今後この技術はより広く使われるだろうし，JavaScriptをあまり書きたくなかったためWebAssemblyを使うことにした．

# 設計
WebAssemblyの主な使用目的はJavaScriptを倒すことではなく(=DOMを弄ることではなく)，高速に計算を行うことだ．
そのため，今回はなんらかの数値計算をWebAssemblyを使って行ってみることにした．
いきなり数値計算といっても，複雑なものはハードルが高いので，既に自分で実装したことのあるN体重力相互作用の計算と，粒子法を用いた流体の計算を行ってみようと考えた．
また，フレームワークを使いたくなかったためEmscriptenは使わず，LLVMのみを使ってビルドすることにした．

# 評価
実際にかけた時間は数時間ほどで，粒子法を実装する時間がなかった．
また，浮動小数点数や文字列をJavaScriptとやりとりするのが予想以上に面倒であったり，JavaScriptに全く慣れておらずWebAssemblyをロードする部分がどのように行われているかしっかりと理解するのにやや時間がかかった．
また，元々はK&R mallocを実装し，dlmalloc(Memory.grow()でページ数を増やせるため，これを使うとsbrkのようなものが実装できる．そのため，dlmallocが移植できると考えた)とのパフォーマンス測定をすることなども考えていたのだが，面倒になってしまい結局すべてスタック上に変数を置いてしまった(WebAssemblyはスタックマシンなので，大きなスタックを使うことは間違っているわけではないのだが)．

その後，研究会での発表向けにEmscriptenを触ってみたのだが，何もしなくても標準入出力やメモリ確保，標準ライブラリ関数が使えることの便利さと気持ち悪さを再認識した．

時間をかけて改良を行えるとすれば，以下のようなことが考えられる．
- 数値積分手法をオイラー法以外にも実装し，比較できるようにする(4次のルンゲクッタ法やリープフロッグ法(天文計算でよく使われる))
- 独立時間刻みによる時間発展の計算
- 粒子法による流体計算の実装
- 計算結果の3D表示
- 計算結果の高速な描画(WebGLなどを使用？)
- 描画範囲のユーザー設定
- mallocの実装(及びdlmalloc,jemalloc,mimallocとのパフォーマンス比較)
- new/deleteの実装
- C++用アロケータクラスの実装
- std::vectorの実装
- 時間発展の計算のユーザー設定(簡単なインタプリタを実装．JITのようにその場でwasmを出力できると良いのだが，現在のWebAssemblyでは難しい(同じモジュール内に後から関数を追加できないので，結局関数呼び出しのコストが大きくなってしまう))
- コンソール・シェルの実装(ボタンではなくコマンドを打つようにする)
- アラートループの表示
- BGMとしてDUVETを流す

# 謝辞
参考文献は以下に示す通り．
- [MDN web docs](https://developer.mozilla.org)
- [WebAsembly Specification](https://webassembly.github.io/spec/core/index.html)
- [Compileing C to WebAssembly without Emscripten](https://dassur.ma/things/c-to-webassembly/)
- [wasm-stdlib-hack](https://github.com/guybedford/wasm-stdlib-hack)
- [lldでwasmをリンクするまで](https://qiita.com/chikoski/items/41853dfb2afdec52e7d1)
