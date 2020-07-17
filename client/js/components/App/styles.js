import { Paragraph } from 'components/shared';
import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  align-items: center;
  padding-top: 70px;
  background-color: transparent;
`;

export const GamePanel = styled.div`
  display: block;
  width: 867px;
  background-color: transparent;
  border-radius: 5px;
  box-shadow: 0 2px 0px #666, 0 3px 0px #555, 0 4px 0px #444, 0 6px 6px #000;
`;

export const GameHeader = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 867px;
  background: #000;
  background: linear-gradient(-60deg, #000, #333, #000, #666, #333 70%);
  width: 867px;
  left: 0;
  padding-left: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5), inset 0 4px 5px #000;
  border: 2px solid #333;
  border-radius: 5px 5px 0 0;
`;

export const Logo = styled(Paragraph)`
  margin-left: 10px;
  font-size: 22px;
  color: #f2f2f2;
  font-weight: 300;
`;

export const GameContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 867px;
  background-color: #fff;
  box-shadow: inset 0 0 3px 1px #ddd;
  border: 2px solid #333;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 5px;
`;

export const RightContent = styled.div`
  flex-grow: 1;
`;

export const StatisticsRow = styled.div``;

export const CountdownRow = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff8e1;
  box-shadow: 1px 1px 1px 0 #ddd;
  margin: 5px 0 0 0;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px 0 0 0;
  box-shadow: 1px 1px 1px 0 #ddd;
`;

export const WelcomeMessage = styled(Paragraph)`
  padding: 0 30px;
  font-size: 18px;
  font-weight: 300;
`;
