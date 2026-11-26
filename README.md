# Ứng dụng Sổ Chi Tiêu Cá Nhân

- **Họ và tên:** Đỗ Thành Long
- **Mã sinh viên:** B25DCTV049

## Cách chạy dự án

### 1. Chạy Phần A (Class Component)
```bash
cd part-a-class
npm install
npm start
```

### 2. Chạy Phần B (Function Component + Hooks)
```bash
cd part-b-hooks
npm install
npm start
```

## Hooks đã khắc phục các thách thức của Class Component ở đâu trong bài?

1. **Tái sử dụng logic gọi API (`useFetch`):** Ở Class Component, việc fetch dữ liệu, quản lý `loading` và `error` gắn chặt vào vòng đời của component, khó tái sử dụng. Custom hook `useFetch` tách toàn bộ logic `GET / POST / DELETE` ra khỏi giao diện, giúp `App.js` gọn gàng hơn.
2. **Gom nhóm logic vòng đời và dọn dẹp gọn gàng (`useEffect`):** Ở Phần A, đồng hồ phải tách làm hai hàm `componentDidMount` và `componentWillUnmount`, còn cập nhật tiêu đề tab nằm ở `componentDidUpdate` kèm điều kiện so sánh `prevState`. Với `useEffect`, mỗi tác vụ nằm trọn trong một hàm duy nhất kèm hàm cleanup `clearInterval` ngay bên trong, tránh quên hủy timer.
3. **Loại bỏ rườm rà `this` và thao tác DOM trực tiếp (`useContext`, `useRef`):**
   - Không còn lỗi nhầm ngữ cảnh `this.state` / `this.setState` như trong Class.
   - `useContext` (`ThemeContext`) chia sẻ trạng thái Sáng/Tối xuyên suốt ứng dụng mà không cần truyền props thủ công qua nhiều tầng.
   - `useRef` truy cập trực tiếp thẻ `<input>` để tự động focus sau khi thêm khoản chi mà không làm component render lại.