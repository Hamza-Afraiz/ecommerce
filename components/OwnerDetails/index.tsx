import React from "react";
import { ownerDetailsType } from "./OwnerDetails.types";
import { Avatar, Comment } from "antd";

import "antd/dist/antd.css";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;
import Image from "next/image";
import laptopPic from "../public/laptop.png";
import Link from "next/link";
import { useRouter } from 'next/router'
const OwnerDetails = ({ name, rating }: ownerDetailsType) => {
  return (
    <div>
      <Comment
        author={<a>Han Solo</a>}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
      />
    </div>
  );
};

export default OwnerDetails;
