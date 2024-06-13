export { default } from "../../components/ui/BannerCarousel.tsx";
import { getSrcSet } from "apps/website/components/Image.tsx";
import type { Props } from "../../components/ui/BannerCarousel.tsx";

export const loader = (props: Props, __, ctx) => {
  const desktopImg = props.images?.[0].desktop;
  const mobileImg = props.images?.[0].mobile;

  const setPreload = (src: string) => {
    ctx.response.headers.append(
      "link",
      `<${src}>; rel=preload; as=image`,
    );
  };

  const parseSrcSet = (imgSrcSet: string) =>
    imgSrcSet.split(", ").forEach((src) => setPreload(src.split(" ")[0]));

  // if (desktopImg) {
  //   const imgSrcSet = getSrcSet(desktopImg, 1440, 600, "cover");
  //
  //   parseSrcSet(imgSrcSet);
  // }

  if (mobileImg) {
    const imgSrcSet = getSrcSet(mobileImg, 430, 590, "cover");
    parseSrcSet(imgSrcSet);
  }

  // console.log({ imgSrc });
  // imgSrc &&
  //   ctx.response.headers.append(
  //     "link",
  //     `<${imgSrc}>; rel="preload"; as="image"`,
  //   );

  return props;
};
