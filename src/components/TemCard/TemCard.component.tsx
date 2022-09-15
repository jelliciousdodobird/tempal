import styled from "@emotion/styled";
import Image from "next/image";

interface TemProps {
  number: number;
  name: string;
  imgUrl: string;
  types: string[];
}

const Container = styled.div`
  /* border: 1px dashed gray; */
  position: relative;

  width: 100%;
  min-height: 15rem;
  max-height: 15rem;

  display: flex;
  flex-direction: row;
`;

const CardBackground = styled.div`
  position: absolute;
  bottom: 0;

  background-color: hsl(0, 0%, 16%, 1);
  border-radius: 1rem;

  height: 80%;
  width: 100%;
`;

const ContentContainer = styled.div`
  position: relative;
  padding: 1rem;
  padding-top: 0;

  width: 100%;

  display: flex;
  flex-direction: row;
`;

const Portrait = styled.div`
  /* border: 1px dashed gold; */
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RightColumn = styled.div`
  /* border: 1px dashed gold; */
  position: relative;

  /* flex-grow: 2; */

  flex: 1;

  /* width: 100%; */

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ImageHolder = styled.div`
  border: 0.5rem solid hsl(0, 0%, 20%, 1);
  border-radius: 50%;
  overflow: hidden;

  width: 96px;
  height: 96px;

  background: hsl(0, 0%, 20%, 1);
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 16px;

  margin-top: 8px;
  margin-left: 5px;

  width: min-content;
  background: hsl(0, 0%, 8%, 1);
  padding: 5px 10px;
  clip-path: polygon(12% 0, 100% 8%, 95% 96%, 14% 100%, 1% 66%);
`;

const ElementHolder = styled.div`
  display: flex;
`;

const ElementType = styled.span`
  padding: 5px 10px;

  font-weight: 400;
  font-size: 12px;
`;

export const TemCard = ({ number, name, imgUrl, types }: TemProps) => {
  return (
    <Container>
      <CardBackground />
      <ContentContainer>
        <Portrait>
          <ImageHolder>
            <Image
              src={imgUrl}
              width={96}
              height={96}
              quality={100}
              objectFit="none"
            />
          </ImageHolder>
          <ElementHolder>
            <ElementType>{types[0]}</ElementType>
            {types.length > 1 && <ElementType>{types[1]}</ElementType>}
          </ElementHolder>
        </Portrait>
        <RightColumn>
          <Name>{name}</Name>
        </RightColumn>
      </ContentContainer>
    </Container>
  );
};
