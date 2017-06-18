(function() {
	"use strict";
	var qNo;
	var questions = [
		{
			q: '巳の刻は<br>午前？午後？',
			a: 0,
			d: '十二時辰（十二辰刻、十二刻などとも）<br>は2時間区切りで、<br>丑・寅・卯・辰・巳は午前、<br>未・申・酉・戌・亥は午後になります。<br>ただし、子の刻は午後11時から午前1時までの間、<br>午の刻は午前11時から午後1時までの間なので<br>午前とも午後とも言えません。<br><a href="http://ja.wikipedia.org/wiki/%E5%8D%81%E4%BA%8C%E6%99%82%E8%BE%B0" target="_blank">十二時辰について詳しく（Wikipedia）</a>'
		}, {
			q: 'BUMP OF CHICKEN<br>「天体観測」の歌詞に<br>出てくる「2時」は午前？午後？',
			a: 0,
			d: '歌の冒頭で<br>「午前二時 フミキリに 望遠鏡を担いでった」<br>と歌われます。<br>君が来たのはその二分後で、<br>もう一度君に会おうとした後日の午前二時二分に<br>君が来なかった場合も「イマ」というほうき星を<br>君と二人追いかけています。<br><a href="http://www.utamap.com/showkasi.php?surl=66059" target="_blank">天体観測の歌詞を見る（うたまっぷ）</a>'
		}, {
			q: '37時は午前？午後？',
			a: 1,
			d: '時刻を24で割った時に余りが<br>12未満なら午前、12以上なら午後になります。<br>37は24で割ると余りが13なので、午後になります。'
		}, {
			q: '新幹線の終電は<br>午前？午後？',
			a: 1,
			d: '新幹線の終電は、特殊な場合を除き<br>午前0時を過ぎて運行してはならないとの<br>規制があります。<br>これは騒音に配慮してのことであり、実際、<br>東京発の終電で最も遅いのは23時00分発の<br>上越新幹線「Maxたにがわ477号」で、<br>終着の高崎駅には23時58分に到着します。<br><a href="http://ja.wikipedia.org/wiki/%E7%B5%82%E9%9B%BB" target="_blank">終電について詳しく（Wikipedia）</a>'
		}, {
			q: '正午は<br>午前12時？午後12時？',
			a: 0,
			d: '午前と午後を定義している法律で、<blockquote>午前零時即午後十二時　子刻<br>午前十二時　午刻</blockquote>とはっきり定義されているので、<br>正午は午前12時になります。<br>ただし、誤解を避けるためには「午後0時」<br>という言い方をしたほうが誤解は少なそうです。<br><a href="http://www.nao.ac.jp/faq/a0401.html" target="_blank">午前・午後について詳しく（国立天文台）</a>'
		}, {
			q: '引っ越し料金が<br>安いのは午前？午後？',
			a: 1,
			d: '業者が一日の中で最初に作業を<br>行なう引越しになるため、<br>ほぼ確実に予約した時間に作業が始まります。<br>そして作業時間自体も大きな狂いはなく、<br>終了時間も早めになるでしょう。<br>その分、料金は割高になっています。<br><a href="http://www.hikkoshinomikata.com/ryoukin/jikantai.html" target="_blank">引っ越しの時間帯について詳しく（外部サイト）</a>'
		}, {
			q: '「トリビアの泉」の<br>第1回が放送されたのは<br>午前？午後？',
			a: 0,
			d: '「トリビアの泉 〜素晴らしきムダ知識〜」<br>は、フジテレビ系列にて2002年10月7日から<br>放送され、2003年3月17日までの20回、<br>月曜日25:40-26:10に放送されていました。<br>その後、ゴールデン・全国ネット枠が開始し、<br>水曜日21:00-21:54に放送されることになりました。<br><a href="http://ja.wikipedia.org/wiki/%E3%83%88%E3%83%AA%E3%83%93%E3%82%A2%E3%81%AE%E6%B3%89_%E3%80%9C%E7%B4%A0%E6%99%B4%E3%82%89%E3%81%97%E3%81%8D%E3%83%A0%E3%83%80%E7%9F%A5%E8%AD%98%E3%80%9C" target="_blank">トリビアの泉について詳しく（Wikipedia）</a>'
		}, {
			q: '（最終問題）<br>このページの作者<br>岩淵勇樹の誕生時間は<br>午前？午後？',
			a: 0,
			d: '岩淵勇樹（物智）は<br>1984年9月13日午前6時18分に<br>福井県の勝山病院で生まれました。<br><a href="http://butchi.jp/profile.html" target="_blank">岩淵勇樹のプロフィールを見る（公式サイト）</a>'
		}
	];

	var $left = $('.left-half');
	var $right = $('.right-half');
	$left.addClass('gozen');
	$right.addClass('gogo');
	var $rightObj = $left.children().clone();
	$right.prepend($rightObj);

	var $question = $('.area-question .question');
	var $educationTxt = $('.area-education .text');
	var $areaQuestion = $('.area-question');
	var $areaEducation = $('.area-education');
	var $correct = $('.correct');
	var $incorrect = $('.incorrect');
	var $boxAchievement = $('.box-achievement');

	$('.area-question .btn').click(answer);
	$('.area-education .btn-back').click(backQuestion);

	function answer() {
		var aId = $(this).attr('data-answer-id');
		if(aId == questions[qNo].a) {
			// 正解時
			$correct.show();
			$correct.find('.inner').css({marginTop: '50px'});
			$correct.find('.inner').animate({marginTop: '0px'}, 300, 'easeOutBack', window.setTimeout(function() {
				nextQuestion();
				$correct.hide();
			}, 1500));
		} else {
			// 不正解時
			$incorrect.show();
			$incorrect.find('.inner').css({marginTop: '-50px', opacity: 0});
			$incorrect.find('.inner').animate({marginTop: '0px', opacity: 1}, 500, 'linear', window.setTimeout(function() {
				showEducation();
				$incorrect.hide();
			}, 2000));
		}
	}

	function showEducation() {
		$areaQuestion.hide();
		$areaEducation.show();
	}

	function backQuestion() {
		$areaEducation.hide();
		$areaQuestion.show();
	}

	function nextQuestion() {
		if(qNo + 1 < questions.length) {
			qNo++;
			$question.html('Q'+(qNo + 1)+'. '+questions[qNo].q);
			$educationTxt.html(questions[qNo].d);
		} else {
			$areaQuestion.hide();
			$boxAchievement.show();
		}
	}

	function init() {
		qNo = -1;
		nextQuestion();
	}

	init();
})();