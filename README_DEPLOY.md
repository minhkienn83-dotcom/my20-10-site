# Deploy hướng dẫn — GitHub Pages (automatic)

Hướng dẫn nhanh để deploy trang tĩnh lên GitHub Pages và bật CI để tự động deploy khi push vào `main`.

1) Tạo repository trên GitHub (hoặc dùng repo hiện có).
2) Thêm remote và push từ PowerShell (thay `USERNAME/REPO`):

```powershell
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

3) File workflow đã được thêm vào `.github/workflows/deploy.yml` — workflow này chạy khi bạn push vào `main` và deploy nội dung repository lên GitHub Pages.

4) Bật Pages nếu cần: vào repo → Settings → Pages. GitHub Pages sẽ sử dụng workflow deploy action và triển khai nội dung. Sau khi workflow chạy xong (thường vài phút), site sẽ có URL: `https://USERNAME.github.io/REPO`.

Ghi chú:
- Nếu repo private, Pages vẫn hoạt động nhưng URL sẽ ở dạng `https://USERNAME.github.io/REPO` nếu bạn bật Pages.
- Đảm bảo tất cả assets (images, music) đã được add và commit.
- Nếu bạn muốn mình tạo repo và đẩy code giúp (yêu cầu token/permissions), mình có thể hướng dẫn cách tạo PAT và cấu hình — nhưng không thể tự thao tác thay bạn.
