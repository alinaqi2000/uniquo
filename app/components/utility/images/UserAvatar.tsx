import React, { useEffect, useState } from "react";
import { IAvatarProps, Avatar } from "native-base";
import colors from "../../../config/colors";
import { placeholders } from "../../../config/assets";
import { useSelector } from "react-redux";
import { State } from "../../../store";
import { useDispatch } from "react-redux";
import { addFailedMedia } from "../../../store/app/app.actions";

interface AvatarProps extends IAvatarProps {
  uri?: string;
  alt?: string;
}
export default function UserAvatar({ uri, alt, ...props }: AvatarProps) {
  const [error, setError] = useState(false);
  const { failedMedia } = useSelector((state: State) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (failedMedia.includes(uri)) {
      setError(true);
    }
  }, [failedMedia]);

  return (
    <>
      <Avatar
        display={error ? "flex" : "none"}
        bg={colors.primaryColor}
        source={placeholders.user}
        {...props}
      />
      <Avatar
        display={error ? "none" : "flex"}
        bg={colors.primaryColor}
        source={{ uri }}
        _image={{
          onError: () => {
            if (!failedMedia.includes(uri)) {
              dispatch(addFailedMedia(uri));
            }
          },
        }}
        {...props}
      >
        {alt}
      </Avatar>
    </>
  );
}
