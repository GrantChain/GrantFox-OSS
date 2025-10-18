"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowRightIcon, Edit, Trash2 } from "lucide-react";
import { Campaign } from "@/types/campaign.type";
import { Details } from "./Details";
import { useCampaignContext } from "@/context/CampaignContext";
import { EditDialog } from "./EditDialog";
import { DeleteDialog } from "./DeleteDialog";

interface CardTransform {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const {
    openDetails,
    setOpenDetails,
    openEdit,
    setOpenEdit,
    openDelete,
    setOpenDelete,
    setCampaign,
  } = useCampaignContext();

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card || !image) return;

    let rect: DOMRect;
    let centerX: number;
    let centerY: number;

    const updateCardTransform = (mouseX: number, mouseY: number) => {
      if (!rect) {
        rect = card.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }

      const relativeX = mouseX - centerX;
      const relativeY = mouseY - centerY;

      const cardTransform: CardTransform = {
        rotateX: -relativeY * 0.035,
        rotateY: relativeX * 0.035,
        scale: 1.025,
      };

      const imageTransform: CardTransform = {
        rotateX: -relativeY * 0.025,
        rotateY: relativeX * 0.025,
        scale: 1.05,
      };

      return { cardTransform, imageTransform };
    };

    const animate = () => {
      const { cardTransform, imageTransform } = updateCardTransform(
        lastMousePosition.current.x,
        lastMousePosition.current.y
      );

      card.style.transform = `perspective(1000px) rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg) scale3d(${cardTransform.scale}, ${cardTransform.scale}, ${cardTransform.scale})`;
      card.style.boxShadow = "0 10px 35px rgba(0, 0, 0, 0.2)";

      image.style.transform = `perspective(1000px) rotateX(${imageTransform.rotateX}deg) rotateY(${imageTransform.rotateY}deg) scale3d(${imageTransform.scale}, ${imageTransform.scale}, ${imageTransform.scale})`;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      card.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
      image.style.transition = "transform 0.2s ease";
      animate();
    };

    const handleMouseLeave = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      card.style.boxShadow = "none";
      card.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";

      image.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      image.style.transition = "transform 0.5s ease";
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Card ref={cardRef} className="max-w-md">
      <CardHeader>
        <CardTitle>{campaign.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <img
          ref={imageRef}
          src={campaign.image}
          alt="Banner"
          className="aspect-video w-full rounded-md object-cover"
          width={500}
          height={500}
        />

        <p>{campaign.description}</p>

        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
              setCampaign(campaign);
              setOpenDetails(true);
            }}
          >
            View Campaign <ArrowRightIcon />
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                setCampaign(campaign);
                setOpenEdit(true);
              }}
            >
              <Edit className="size-4" />
            </Button>

            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                setCampaign(campaign);
                setOpenDelete(true);
              }}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>

      {/** View Sheet */}

      {campaign && openDetails && <Details />}

      {/** Edit Dialog */}
      {campaign && openEdit && <EditDialog />}

      {/** Delete confirmation Dialog */}
      {campaign && openDelete && <DeleteDialog />}
    </Card>
  );
};
