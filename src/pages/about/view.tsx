import React, { FC } from "react";
import DOMPurify from "dompurify";

const containerStyle: React.CSSProperties = {
  margin: "10px 15%",
  fontSize: 18,
  lineHeight: 1.6,
  color: "#333",
};

const AboutView: FC = () => {
  const data = `
   <p><span style="font-size: 18pt;"><strong>Chào mừng đến với Trendy Hub</strong></span></p>
<p><span style="font-size: 14pt;">"Trendy Hub là cửa hàng hiện đại tại Việt Nam chuyên cung cấp các sản phẩm quần áo, giày dép và thiết bị điện tử. Với các cửa hàng tại Hà Nội và Thành phố Hồ Chí Minh, chúng tôi cung cấp một lựa chọn đa dạng các sản phẩm thời trang, giày dép trendy và các thiết bị công nghệ mới nhất."</span></p>
<p><span style="font-size: 18pt;"><strong>Câu chuyện của chúng tôi</strong></span></p>
<p><span style="font-size: 14pt;">Tên gọi Trendy Hub được lấy cảm hứng từ những khu chợ sôi động và nền văn hóa vibrant của Việt Nam, nơi mà truyền thống gặp gỡ sự đổi mới.</span></p>
<p><span style="font-size: 14pt;">Cửa hàng flagship của chúng tôi tại Hà Nội tọa lạc tại số 123 Phố Lý Thường Kiệt, Quận Hoàn Kiếm. Tại Thành phố Hồ Chí Minh, bạn sẽ tìm thấy chúng tôi tại số 456 Đại lộ Nguyễn Huệ, Quận 1. Được thành lập vào năm 2015, chúng tôi đã phát triển từ một cửa hàng nhỏ trở thành điểm đến của những người tìm kiếm sản phẩm chất lượng cao và dịch vụ khách hàng xuất sắc.</span></p>
<p><span style="font-size: 18pt;"><strong>Tầm nhìn của chúng tôi</strong></span></p>
<p><span style="font-size: 14pt;">Là một trong những cửa hàng bán lẻ năng động nhất tại Việt Nam, Trendy Hub cung cấp một loạt sản phẩm đa dạng để đáp ứng nhu cầu phong cách sống của những người mua sắm hiện đại.</span></p>
<p><span style="font-size: 14pt;">Chúng tôi tin rằng quần áo và phụ kiện không chỉ là thời trang mà còn là cách thể hiện cá tính, trong khi công nghệ là chìa khóa để mở ra tiềm năng trong mọi lĩnh vực của cuộc sống. Đội ngũ tận tâm của chúng tôi luôn sẵn sàng giúp bạn tìm kiếm bộ trang phục hoàn hảo, đôi giày lý tưởng, hoặc thiết bị công nghệ mới nhất để nâng cao phong cách sống của bạn.</span></p>
<p><span style="font-size: 14pt;">Hãy đến với Trendy Hub hôm nay để trải nghiệm một không gian mua sắm kết hợp giữa phong cách, đổi mới và tiện lợi.</span></p>

  `;

  return (
    <>
      <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Về chúng tôi</h3>
      <hr style={{ margin: "10px 0" }} />
      <div
        style={containerStyle}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data),
        }}
      />
    </>
  );
};

export default AboutView;
