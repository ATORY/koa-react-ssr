import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

// import Convert from "ansi-to-html";
import { fetchServerInfo } from "../redux/actions";
import { deploy } from "../api/index";

// const convert = new Convert();
// const convertOption = {};

const Section = styled.section`
  /* padding-left: 20px; */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .info {
    flex-grow: 1;
    background: darkgray;
    padding: 20px;
    overflow: scroll;
  }
`;
const VerSec = styled.div`
  display: flex;
  align-items: baseline;
  margin: 5px 0;
  h3 {
    margin: 0 10px;
    /* width: 100px; */
    /* display: inline-block; */
  }
  div {
    display: flex;
    overflow: scroll;
  
    .version {
      cursor: pointer;
      white-space: nowrap;
      padding: 5px;
      margin: 5px;
      border: 1px solid gray;
      display: inline-block;
      &.will-version {
        background: #007bff;
        color: #fff;
        border-color: #007bff;
      }
    }
  }
`

const BuildSec = styled.div`
  h3 {
    display: inline-block;
  }
`

const Button = styled.button`
  width: 100px;
  height: 40px;
  font-size: 1rem;
  background: #007bff;
  color: #fff;
  outline: none;
  border-color: #fff;
`

function Server({ serverInfo, fetchServerInfo }) {
  let [deployInfo, setDeployInfo] = useState('');
  let [deployDone, setDeployDone] = useState(true);
  let [willVersion, setWillVersion] = useState('');
  let { server } = useParams();
  useEffect(() => {
    if (serverInfo.serverName !== server) {
        setDeployInfo('');
        setDeployDone(true);
        setWillVersion('');
      fetchServerInfo(server);
    }
  }, [ server ]);
  const { versions = {}, onlineVersion, loading = false } = serverInfo;
  const { alpha = [], beta = [], preProd = [], prod = [] } = versions;
  return (
    <Section>
      <h3>{server}</h3>
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <VerSec>
            <h3>alpha:</h3>
            <div>{genVerList(alpha)}</div>
          </VerSec>
          <VerSec>
            <h3>beta:</h3>
            <div>{genVerList(beta)}</div>
          </VerSec>
          <VerSec>
            <h3>preProd:</h3> 
            <div>{genVerList(preProd)}</div>
          </VerSec>
          <VerSec>
            <h3>prod:</h3>
            <div>{genVerList(prod)}</div>
          </VerSec>
        </>
      )}
      <BuildSec>
        <h3>The select: {willVersion}</h3>
        {/* Build 为打包的 bin 文件 */}
        <Button onClick={doDeploy}>Build</Button>
      </BuildSec>
      <BuildSec>
        <h3>The select: {willVersion}</h3>
        {/* TODO: Deploy 为测试通过的 bin 文件。 */}
        <Button onClick={doDeploy}>Deploy</Button>
      </BuildSec>
      <div className="info">
          <div dangerouslySetInnerHTML={{__html: deployInfo}} />
        {deployDone ? 'deploydone' : 'deploying'}
      </div>
    </Section>
  );

  function genVerList(vers) {
    return vers.map(v => {
      let className = 'version'
      if (v === willVersion) {
        className += ' will-version'
      }
      return <span className={className} key={v} onClick={() => setWillVersion(v)}>{v}</span>
    });
  }
  function doDeploy() {
    if (!willVersion) return;
    if (!deployDone) return;
    setDeployDone(false);
    deploy({ serverName: server, version: willVersion })
      .then(response => {
        const reader = response.body.getReader();
        let charsReceived = 0;
        let html = ''
        reader.read().then(function processText({ done, value }) {
          if (done) {
            setDeployDone(true);
            console.log("Stream complete", charsReceived);
            return;
          }
          console.log(value);
          charsReceived += value.length;
          // html += convert.toHtml(new TextDecoder("utf-8").decode(value), convertOption);
          html += new TextDecoder("utf-8").decode(value);
          const htmlStr = html.split('\n').join('<br />')
            setDeployInfo(htmlStr)
        //   const chunk = value;
        //   let listItem = document.createElement("li");
        //   listItem.textContent =
        //     "Read " +
        //     charsReceived +
        //     " characters so far. Current chunk = " +
        //     chunk;
        //   list2.appendChild(listItem);

        //   result += chunk;

          // Read some more, and call this function again
          return reader.read().then(processText);
        });
      })
      .catch(console.error);
  }
}

const mapStateToProps = (state, ownProps) => ({
  serverInfo: state.serverInfo
});
export default connect(
  mapStateToProps,
  { fetchServerInfo }
)(Server);
