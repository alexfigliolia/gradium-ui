import type { RefCallback } from "react";
import { Component } from "react";
import { Confirmation } from "Components/Confirmation";
import type { Controller, ISliderChild } from "Components/TouchSlider";
import { DEFAULT_OPTIONS, TouchSlider } from "Components/TouchSlider";
import type { GradiumImage } from "GraphQL/Types";
import { Left } from "Icons/Left";
import { Right } from "Icons/Right";
import { ModalStack } from "Tools/ModalStack";
import type { Callback, Maybe } from "Types/Generics";
import { ConfirmDelete } from "./ConfirmDelete";
import { ImageLink } from "./ImageLink";
import "./styles.scss";

export class ImageViewer extends Component<Props, State> {
  private controller?: Maybe<Controller>;
  private slides = this.createSlides();
  public state: State = { index: 0, deleting: undefined };
  private readonly Toggle = ModalStack.create(
    () => {
      const { index } = this.state;
      this.setState({ deleting: this.props.images[index] });
    },
    () => {
      this.setState({ deleting: undefined });
    },
  );

  public override componentDidMount() {
    this.controller?.flickity?.on?.("change", this.setIndex);
  }

  public override componentWillUnmount() {
    this.controller?.flickity?.off?.("change", this.setIndex);
  }

  public override UNSAFE_componentWillReceiveProps({
    images,
  }: Readonly<Props>) {
    if (images !== this.props.images) {
      this.slides = this.createSlides(images);
    }
  }

  private createSlides(images = this.props.images) {
    return images.map(img => ({
      type: "child",
      content: <ImageLink key={img.id} url={img.url} />,
    })) as ISliderChild[];
  }

  private readonly setIndex = (index: number) => {
    this.setState({ index });
  };

  private readonly prev = () => {
    this.controller?.flickity?.previous?.();
  };

  private readonly next = () => {
    this.controller?.flickity?.next?.();
  };

  private readonly cacheController = (controller: Controller | null) => {
    if (controller) {
      this.controller = controller;
      this.props?.controllerRef?.(controller);
    }
  };

  public override render() {
    const { index, deleting } = this.state;
    const { open, images, close } = this.props;
    return (
      <Confirmation open={open} close={close} className="image-viewer">
        <h2>Attachments</h2>
        <div className="slider">
          <TouchSlider
            images={this.slides}
            options={DEFAULT_OPTIONS}
            ref={this.cacheController}
          />
        </div>
        <div className="controls">
          <button
            onClick={this.prev}
            className="prev-next"
            aria-label="previous"
            disabled={index === 0}>
            <Left aria-hidden />
          </button>
          <button className="delete" onClick={this.Toggle.open}>
            Delete Attachment
          </button>
          <button
            onClick={this.next}
            aria-label="next"
            className="prev-next"
            disabled={index === images.length - 1}>
            <Right aria-hidden />
          </button>
        </div>
        <ConfirmDelete image={deleting} close={this.Toggle.close} />
      </Confirmation>
    );
  }
}

interface State {
  index: number;
  deleting?: GradiumImage;
}

interface Props {
  open: boolean;
  close: Callback;
  images: GradiumImage[];
  controllerRef?: RefCallback<Controller>;
}
