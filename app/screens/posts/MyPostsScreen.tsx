import React, { useEffect, useState } from "react";
import { FlatList, HStack, Text, View, VStack } from "native-base";

import Feed from "../../components/layout/AppLayout";
import { useSelector } from "react-redux";
import { State } from "../../store";
import PostItem from "../../components/utility/ui/PostItem";
import { Post } from "../../models/Post";
import PostCommentSheet from "../../components/utility/ui/PostCommentSheet";
import { setMyPosts } from "../../store/posts/posts.actions";
import { PostMedia } from "../../models/PostMedia";
import { User } from "../../models/User";
import { useDispatch } from "react-redux";

export default function MyPostsScreen({ navigation, route }) {
  const { user } = useSelector((state: State) => state.app);
  const competitions = useSelector((state: State) => state.competitions);
  var { my } = useSelector((state: State) => state.posts);
  const { post } = route.params;
  my = my.filter((item) => item.id !== post.id);
  my.unshift(post);
  useEffect(() => {}, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setMyPosts([
        new Post(
          1,
          "this is a dummy post",
          "2 days",
          "150",
          false,
          new User(
            "Ali Naqi",
            "ali@gmail.com",
            "ali.naqi",
            "data:image/jpeg;base64,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"
          ),
          [
            new PostMedia(
              1,
              "image",
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1583&q=80"
            ),
            new PostMedia(
              2,
              "image",
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            ),
          ]
        ),
        new Post(
          2,
          "this is a dummy post about my football shots, orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          "2 days",
          "150",
          false,
          new User(
            "Ali Naqi",
            "ali@gmail.com",
            "ali.naqi",
            "data:image/jpeg;base64,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"
          ),
          [
            new PostMedia(
              3,
              "image",
              "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
            ),
            new PostMedia(
              4,
              "image",
              "https://images.unsplash.com/photo-1570498839593-e565b39455fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
            ),
            new PostMedia(
              5,
              "image",
              "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1498&q=80"
            ),
          ]
        ),
        new Post(
          3,
          "this is a dummy post about my fitness goals",
          "2 days",
          "150",
          false,
          new User(
            "Ali Naqi",
            "ali@gmail.com",
            "ali.naqi",
            "data:image/jpeg;base64,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"
          ),
          [
            new PostMedia(
              6,
              "image",
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            ),
            new PostMedia(
              7,
              "image",
              "https://images.unsplash.com/photo-1520536194455-348162e0fe90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            ),
            new PostMedia(
              8,
              "image",
              "https://images.unsplash.com/photo-1520948013839-62020f374478?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            ),
          ]
        ),
        new Post(
          4,
          "this is a dummy post about my fitness goals",
          "2 days",
          "150",
          false,
          new User(
            "Ali Naqi",
            "ali@gmail.com",
            "ali.naqi",
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEA8QDxAPFRAQEBAQFRUWFRUVDw8VFRUXFhYVFhUYHSggGBolHRYVITEhJSkrLi4uGB8zODUsNygtLisBCgoKDg0OGxAQGy0dHh8uLSstKy0tKystLSstLS0tLS0tLS0tLS0tLSstLS0tKystLS0tLS0tLS0tLSstLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQQDBQYCB//EADoQAAIBAgMGAgkCBQUBAQAAAAABAgMRBCExBRJBUWFxgZEGEyIyobHB0fAzQlJicrLhFCNzgvFDB//EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACERAQEAAgICAwADAAAAAAAAAAABAhEDIRIxBCJBEzJR/9oADAMBAAIRAxEAPwDoQAVSgEgCASQBAJAEAkAQCSAAAAgEkAAABAJIAEEgCASQBAJAEAACASSBlBIAgEgCASQBAJAEAkhsACo9o0rpXld55Rk/HJFmE01dPICWCtXxUIvNrJ2S4uXRccvmc9tjbdTf3act1LVpO7t1It0mY2uqBxmF2vXX7py/OuRt8L6SUnlUUoNZXenwI8om41vCDHQrwmt6EoyXNO5lLKoAAEAkAQAABBIAggkAQSABmAJAgEgCASQBAJIAhmt2zjPV08m96TUVpx458DPtLHwopOfHRLVs5bE4mWIqJNq100tVlna71/yVyy0vhjtMpualF1d215KyupS6Z5d3dmTBY2dNuLlOUNba3ffVeZVxW0m3Jz3bpWSSsopcEuRrobQ31ZN3vZLu3Yz8q28Z+ujniI0qcqjbdWaaWWVPeze6ufHxRylWvm92lU7yuvuXK9DflLez3Es8st7l/M7GsxLlFNRzklvbi0iuF+Y7pqRNerdJzb6Jzm+/EryxFNP2ZVPCbXwbZilKTjJyTb/27pq6TldZLVWdiu8Km3K3gn06k6U23+B2v6tp78n4qM8v5kjr9jekVOraE5WnwvbPlmsvHI+cU9xKzipW4XvFeL49i/hJclFJ6JL7diZ0i9vqxBqNgY9yiqVVNVIrJv8A+kVldPi1xNwXZVAJIJAAAQCSABBJAAAAZwCQIBJAAAAQQ2eitjq6hBsDjdq13VrT3pZRk4pcrPPLkMbTtBODtJaPwK0p3cpZ5tvPQxRxSacb/wCDGunHqaamtiJTct7Xjb4v85FXZ9aVPNrOE1vdm2vsbl4O7vZ6t3WjvrkeZ4K+kc7WeWqI8pFvG1hw20XGE1a8pT3311bfS2S8EUqW1VTnZU1J3Sct28nbLevzNgtlO992WZbpbAvmspW8V1HnD+PKstP1c7Wm4Sa92cbJ+KXzKGPwGqas+DTy8tPLIsYnZ9aC/Uk7dfunZFamqkb+sbu9Msn5PMiX/C4/6006Uoys8o8+L7Hqpj3FqEFHLvd83cv4qG/dfvSv/lfY0c8JUjK7k7+Fn1TNJdsspp2eydqVXCMZzglF70bq84tcYu6+fwOz2VjvWxzcXJZ+zpJXsnbVdj5ThJyyjJ/f4Hc+h9KC3mm9/XXNpcGuWfwJlUyjrAAXUQCSABBIAgAAQAALAAAAAAQSQAOf9LKqVNK+b0SWcv8AH3OgOY9MI2SlfNpQXjm/zsRfScfbnqCtB3yWvG5gpYNSkt1tttWtkjPhKO9G11xel5S6K5tNi0Pb3mtNEtEvziYZXUdeE3WwwmzFGKTte2bLCpRjlFItsx+rOW212SSKlW/Q80vaumWakLIrqNndELKGKg8yhUw110NxXje5WSyLSqXHbn54Z05qVrrRroVtqUrq+b624cG+p0GIgiu6ClbmuPE1xyrnzwjmMPBXzZ1Ho5G9RWc1bRx4d+n3NHj8J6uo00rN3XI6b0Vw7lNS/bFWyejya/Opvi5sunYokA1YhBJAAAAQAAIAAFgAAAAAAAEGk9K8M50t6Ku4O/hmvqbsxYqN4TVr3jJW55Aj5ps9tTkl43+C6nU7N1Xll8jm8HFuo3yXhc6XZNB2u37PDmcvI7uKbbZEWsTE8zqJatIw1t1b0r1uWdvIrzmZMZj6UElKau9OLKTxsJaXz0HhUecrKvauYpUrXMlGOj6kY7ERi1mhota6Z6owzMMsZTbftx80W8NKMtGrmkjDKytR6Rxzv0+RvvQOH+zN8d+3wT+pp/SGl7MH13TrPRzCKlh4ZZzSqPu0jowcvI2YANWIQSQAAAEABgQCSALAAAAAAAAB4qzSV3/6eyptL3I/8kP7kVzusbWnFh55zG/rgqsJU6slJNe15pttHWbKd6SsNqbPjVTtG0lpfi7HjYUWoOL1Umjkyy8o75h43paxG9b2bX+hoNqb2blUatq+Gl7d7Z5HU1IZO2prJ4Kym1rJWu1fjf55jDqmc3OvbjlKKlnTnNa33nvWXFRcUdDszDU6kYuF0tUaipgZQlJrJylOWSt7UrXeuuXA6PY6ah7ts73ta5OevynHLr7Tt52pH1ME+CyOP2vtiF9J72nA6/bbco56HDbSwbvdK+d+xXD2ctumv9XSnLebqJt/tzz0ze7Yv4KDUl6qpO/W2dsuBiweHe8pWldZeG9vbva7ZuaGE3pqpa0r3fU2tn45pL+xb29+nS3nd3u+rSOx2XXVSjTkk0t1K3K2X0OW2nFP1LlayctdNFY6XYatQp/9/wC+RbC96U5J9drwANmAQSQAAAEAAAQSQBYAAAAAAAAMWJdot8s/IynmcbprmRlNyxbC+OUrSYCo61Xf3naKatfj2LdONpT/AKr/AAMKwUqbdSj7184vRlyq05ZaM4NPXyst3PT0s7leuZ4sw1cyVZGvnSTd2XYq0THOJ6qVEo3lKMYrVt2RCyltRXpy5nOtZO502M3JQUlLK1+hy1XERlvqMleD/EXxZ8rHCNndGzw1RGpUnqWKFXMmVlYtbdhvUFn7st/vbL6m89D6jlhs+E2vNJmjxM4y3Kcnlu7z6q+h1ex8IqVGEUrNrefd/bJeBpxz7bY8tn8el0AHQ5QgkgAyCSAAAAgAAWAAAAAAAACCSAMdSF9MvqUY1lKU4pZ02ovxSf1Nia2GDcKtaa92o4S67yTT+G6Y8uE1t08PJlvxvpYiQ4ko9HLp3SqtaJXqNO10nndcl1MmIrRUkpNJ9SriNo0433c2teRaRG7fTW7SxM6s3h07Xg5JpcuBzlCKhJp3u3fubzF7Qgp+tpxTqJOOV8l1yNDiNoRu9+2bztdNF4pyY2dthCKeh5pRzKuArXzz14qxch7zI0ytdTsbZlOUYVpJuVrJP3VZtJ2+5vCpsmG7QpL+RPzz+paOrGajjyttAAWVCCSABBJAAgkgAAALAAAAAAAQBJAAEHioezxV08SvJ/Wr8X94rrlxFxVjxWpjjU8zj9vR1phq4aLm5SSeXHNeRhqwhTTcYpc0tH4F6WdytiIp5DuLY1zzxmct2GTko8vE1Naluzblnmze4ygk38uqNNKe8s82nqTuq53rtjjHNtFvZuHdWpGC/c8+i4vyMNLPJZ3ySzu2ddsDZXqYuc/1JK1v4Fy7muGO65OTLUbdK2S0QAOhzBBJAAAAQAABAAAAAZwAAAAAEAAAYcXiY0oSnN+zHzfJLqSMpXq1U5KK4a9zU0PSKNW8YrdembV+6Raw6z1Obnz19XX8bi396uyKdeF+nbUuyK9U5462vlipQ1Ta0uu5gqbWg+Ky6l9Qzs9PkYq+zKMrtwV+drl5WeU16aKptGMm23rfr2OfrYr2rJfmh11fY1FO/q4+V18TUY/CwU47sYrPgi0kZ5W2Lnovhb1abedrz7Jf5aOzNH6N0bOcuSjBfN/Q3h0YenJnewAguoAAAQAAIJIAEEkAALgCwQAAAIAkgGs2vtP1a3IW9Y/KC5vr0Jkt6iLdM20toworPObWUVq+/JHI7X2tOu7OyUXfd/asuL4PuVq+LvK8pNyk3m3dt9CtTkk5J+67+F9e9zoxwkZ3LbxCondXtJcOKNvsfbTpyUar9l5b33OfxUXBp2vblrb+Xn28j3RrRmlmtPBlOTjx5JqtOPly47uPp0J3Sad014MxSWpxWydt1MM913nS5cY9n9DrcHjqdaO9TktM1+5eB5/JxZYe3o8fNjn6eauR73m1kyK0GVKdVqVjJrWxwa3rqSOYrUG6sr6KbNs8RKDdnqjX4WLtKUs222WxrPPWl7Ym1qClOg3u1Izzb92TaWj+GfFM358XwOMlKUqj19bUjL+ZSk5R8m38Drdi+kcqPszvOn39qPZv5HfMOunm3Lt3YK+DxlOtHepyTXxXRrgZyqUkAAACAABAAAgASQALABAAEXNFtba1706L/qmtF0T+pbHG2ot0zbV2woXhSs56OXCHbmzk8ZiteLb8Xfi2Zaztks3yKE3rzOnHGYxlbtUqt3zzeWnBHv1i7r4+J5qy8yrKbvf8RFouzqKUd2XC3HyNdVpuLcovN68E+r5Prx4mVVc+mRO/ndEJTQxKet7rVPVFmjVcPahJprlw6Grqwzyuvp2fD5Exq9+K5S8ufa499UnXp0+B9LGm4Vr5fuSuvFam1ji41fbpyjK3J6dz57JyTe7Z8/8AJRlOcZb0XOMuabT+By5/Hxvrp1YfJynV7fTqlVyby6alH0gxv+mw/s51J3slwS1fxOJjtHEuydWr55+Zhq16l7ylJ922/iUx+Pq91OXyNzUjPstL1bs87q/Vt2uXYtrP8ua7CVFaVrZtPtu5/O3mbFaO3c6o5at4HHypyUqcnFrk/wAuddsz0sTtGuv+8V84/Y4GqrK6Ip4jLXTzQslRLp9joV4VEpQkpRfFM9nyzAbUqUmpU5uL+D6NcUdnsT0lhWtCpaNR5J/sl9mZ3HS8yldAAQVWSQCAJIAAAgkDOYsTiIU4702kvi3yS4sqbV2tToLPOb0ivm+SOUxGNnWlv1HZZ2X0S5GmHHclcstNjtHasqt1dxp/wr3pf1Pguhoq2LbvGOSXIVqt8lwZ4sdMxknTK3bHSbtmzzVf5xMnP8uVK83fIUJR3sl4FTFQaMrq27nitmnf8uUqym619f8A09KoVarMcaxUbBzvkYqkORhjVf5wMyrdQMc6sua/7K/Hg9fiY51Hq4PpuNNeUlf4mSWfHqYJpgYKteTeTn4xX0kYHvO+cvK31LLj5Hhrn+cSmlnrCZcvr5m1w8vZNVAvYedvgWVrNG7TXLyKTklK2Vi7FWl3KuOotO/C4Q9RrJNGaNdx0fUoYpezGS7eRNOrdLsDT6f6Hbe/1EPVVH/uQWT/AI19zpT4psTGypVouDs28n14fGx9e2RtCOIowqx/cs1/DJaoyymmmNXSACqwQAAAAHEbf/Xq/wBb+h4qfT6EA7cfUYX2qrVdzNH6gFlWB8fzkVqgBWpirU18THivd8V/cwClWUquvmUeXYkFEvVPR+JYenh9QCUvXLuvmTW0/ORACFeer7/Q8/w9gCElPVFmnowAisnFd18zNtH3PAAIjXT/AEF/UvkYMPqiAR+p/GTDfrU/+SPzR9N//O/0K3/O/wC1AFcvS2Pt1ZBIM10AAAAAP//Z"
          ),
          [
            new PostMedia(
              7,
              "image",
              "https://images.unsplash.com/photo-1520536194455-348162e0fe90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            ),
            new PostMedia(
              6,
              "image",
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            ),
            new PostMedia(
              8,
              "image",
              "https://images.unsplash.com/photo-1520948013839-62020f374478?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            ),
          ]
        ),
        new Post(
          5,
          "this is a dummy post about my fitness goals",
          "2 days",
          "150",
          false,
          new User(
            "Ali Naqi",
            "ali@gmail.com",
            "ali.naqi",
            "data:image/jpeg;base64,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"
          ),
          [
            new PostMedia(
              8,
              "image",
              "https://images.unsplash.com/photo-1520948013839-62020f374478?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            ),
            new PostMedia(
              6,
              "image",
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            ),
            new PostMedia(
              7,
              "image",
              "https://images.unsplash.com/photo-1520536194455-348162e0fe90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            ),
          ]
        ),
      ])
    );
    return () => {
      dispatch(setMyPosts([]));
    };
  }, []);

  return (
    <Feed>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={my} // your array should go here
        renderItem={({ item }: { item: Post }) => (
          <PostItem post={item} navigation={navigation} />
        )}
      />

      <PostCommentSheet />
    </Feed>
  );
}
