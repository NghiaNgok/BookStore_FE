import { FC, useEffect, useState } from "react";
import Homeview from "./view";
import { fetchAllBooks } from "../../shared/services/book/book.service";
import {
  BookQuery,
  IBook,
  SortBookByEnum,
} from "../../shared/constants/types/book.type";

const HomePage: FC = () => {
  const [book, setBook] = useState<IBook[]>();
  const [featuredBook, setFeaturedBook] = useState<IBook[]>();
  const [filter, setFilter] = useState<BookQuery>({
    sortByEnum: SortBookByEnum.NEW,
    page: 1,
    limit: 4,
  });

  useEffect(() => {
    if (filter.sortByEnum === SortBookByEnum.NEW) {
      findAllBooksFeatured(filter);  // Giữ nguyên API cũ khi "Mới"
    }
  }, [filter]);

  const findAllBooksFeatured = (value: BookQuery) => {
    fetchAllBooks(value)
      .then((res) => {
        const responseData = res.data.data.findAllBooks;
        setFeaturedBook(responseData.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTopSaler = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/dashboard/top-saler');
      
      // Kiểm tra nếu response không phải là JSON (có thể do lỗi server trả về trang HTML)
      if (!response.ok) {
        throw new Error('Server không phản hồi đúng dữ liệu hoặc API không tồn tại.');
      }
      console.log(response)
      // Thử chuyển đổi phản hồi thành JSON
      const data = await response.json();
      
      console.log(data)
  
      if (data.s === 200) {
        setFeaturedBook(data.data); // Cập nhật list sản phẩm nổi bật từ top-saler
      } else {
        throw new Error('Dữ liệu không hợp lệ hoặc không có sản phẩm nổi bật.');
      }
    } catch (error) {
      console.error('Error fetching top saler:', error);
      // Hiển thị lỗi nếu có
      alert(`Đã xảy ra lỗi khi tải sản phẩm phổ biến: `);
    }
  };
  

  const handleChangeFeatured = (val: string) => {
    if (val === "new") {
      setFilter({ ...filter, sortByEnum: SortBookByEnum.NEW });
    }
    if (val === "popular") {
      fetchTopSaler();  // Gọi API top-saler khi "Phổ biến"
    }
  };

  return <Homeview filter={filter} featuredBook={featuredBook} data={book} setFilter={setFilter} handleChangeFeatured={handleChangeFeatured} />;
};

export default HomePage;
