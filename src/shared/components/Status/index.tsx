import { Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { OrderStatus } from "../../constants/types/enum.type";

interface ShowStatusComponentProps {
  status: OrderStatus | undefined;
}

enum Color {
  SUCCESS = "success",
  PROCESSING = "processing",
  ERROR = "error",
  WARNING = "warning",
  DEFAULT = "default",
  CYAN = "cyan",
  GEEKBLUE = "geekblue",
}

const ShowStatusComponent: FC<ShowStatusComponentProps> = (props) => {
  const { status } = props;
  const [color, setColor] = useState<Color>();
  const [text, setText] = useState<string>();
  useEffect(() => {
    if (status) {
      switch (status) {
        case OrderStatus.DONE:
          setColor(Color.SUCCESS);
          setText("HOÀN THÀNH");
          break;
        case OrderStatus.INIT:
          setColor(Color.DEFAULT);
          setText("ĐÃ ĐẶT HÀNG");
          break;
        case OrderStatus.INPROGRESS:
          setColor(Color.WARNING);
          setText("CHỜ LẤY HÀNG");
          break;
        case OrderStatus.APPROVED:
          setColor(Color.CYAN);
          setText("ĐÃ CHẤP NHẬN");
          break;
        case OrderStatus.SHIPING:
          setColor(Color.GEEKBLUE);
          setText("ĐANG GIAO HÀNG");
          break;
        case OrderStatus.REJECTED:
          setColor(Color.ERROR);
          setText("ĐÃ HỦY BỎ");
          break;
        default:
          break;
      }
    }
  }, [status]);
  return (
    <>
      <Tag color={color}>{text}</Tag>
    </>
  );
};

export default ShowStatusComponent;
