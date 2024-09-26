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
          setText("DONE");
          break;
        case OrderStatus.INIT:
          setColor(Color.DEFAULT);
          setText("ORDERED");
          break;
        case OrderStatus.INPROGRESS:
          setColor(Color.WARNING);
          setText("WAITING PICKUP");
          break;
        case OrderStatus.APPROVED:
          setColor(Color.CYAN);
          setText("ACCEPTED");
          break;
        case OrderStatus.SHIPING:
          setColor(Color.GEEKBLUE);
          setText("DELIVERING");
          break;
        case OrderStatus.REJECTED:
          setColor(Color.ERROR);
          setText("CANCLLED");
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
