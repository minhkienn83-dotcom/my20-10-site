# Chúc mừng 20-10 — Trang web nhỏ

Trang này là một trang tĩnh (HTML/CSS/JS) để chúc mừng ngày 20-10 với các hiệu ứng dễ thương (trái tim bay, cánh hoa rơi, gõ chữ, và nhạc nền).

Cấu trúc:
- `index.html` — trang chính
- `css/styles.css` — kiểu dáng
- `js/script.js` — hiệu ứng JavaScript (dùng Anime.js CDN)
- `assets/music.mp3` — (tùy chọn) nhạc nền: thêm file mp3 vào thư mục `assets` và đặt tên `music.mp3`.
- `assets/message.txt` — (tùy chọn) nếu bạn đặt một file văn bản ở đường dẫn này, nhấn nút "Tải từ assets/message.txt" trên trang để nạp nội dung làm lời chúc.
- `assets/images/` — (tùy chọn) thư mục chứa ảnh; bạn có thể thêm ảnh (jpg/png/svg/webp). Trang có sẵn một gallery mẫu hiển thị ảnh trong `assets/images`.

Hoặc bạn có thể bấm nút "Chọn file thư (.txt)" và chọn một file .txt trên máy để nạp lời chúc.

Cách chạy:
1. Mở `index.html` trong trình duyệt (kéo thả file vào cửa sổ trình duyệt hoặc dùng `Open File`).

Ghi chú:
- Do chính sách trình duyệt, file âm thanh có thể cần tương tác người dùng (nhấn nút) để phát.
- Bạn có thể sửa nội dung lời chúc trong `js/script.js` (biến `message`).
- Bạn có thể sửa nội dung mặc định trong `js/script.js` (biến `message`) hoặc dùng `assets/message.txt` / file .txt cá nhân.

Tôi có thể:
- Thêm ảnh, font, hoặc một GIF nhỏ.
- Tạo phiên bản tối ưu cho điện thoại hoặc để in ra PDF.

Nhắn mình muốn chỉnh gì tiếp nhé!

Hướng dẫn thêm ảnh nhanh:
1. Tạo thư mục `assets/images/` (nếu chưa có).
2. Đặt file ảnh vào đó, ví dụ `assets/images/photo1.jpg`.
3. Trong `index.html` bạn có thể thêm thẻ `<img src="assets/images/photo1.jpg" alt="...">` vào `.gallery-grid`.

Muốn mình tự động quét thư mục `assets/images` và hiển thị tất cả ảnh (tự load danh sách) không? (cần server hoặc danh sách tĩnh).

---

## Muốn học lập trình web từ project này?

Mình đã thêm một bộ bài học trong thư mục `lessons/`. Mở `lessons/LESSONS_README.md` để bắt đầu. Các bài rất cơ bản, kèm bài tập thực hành trên project hiện tại.

Nếu bạn muốn, mình sẽ hướng dẫn từng bước qua chat (mình sẽ chỉ lệnh mở file, sửa, và cách kiểm tra trong trình duyệt).