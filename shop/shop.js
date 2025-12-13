// ページトップへ戻る（フッターのリンク）
document.querySelector("footer a").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* ================================
   Item 3 - 画像スライドショー
================================ */
const slides = document.querySelectorAll(".slide-wrapper img");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active"); // 今の画像を消す
  index = (index + 1) % slides.length;      // 次へ
  slides[index].classList.add("active");    // 次の画像表示
}, 4000); // ←切り替え間隔（ゆっくり）4秒推奨


