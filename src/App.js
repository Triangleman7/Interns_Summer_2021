import React from "react";
import XLSX from "xlsx"
  
class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };
  handleChange(e) {
    const files = e.target.files;
    if(files&&files[0]) this.props.handleFile(files[0]);
  };
  render() {
    return (
      <form className='form-inline'>
        <div className='form-group'>
          <label htmlFor='file'>Spreadsheet </label>
          <input type='file' className='form-control' id='file' accept='xlsx' onChange={this.handleChange} />
        </div>
      </form>
    );
  };
}
 
class OutTable extends React.Component {
  render() {
    return (
      <div className='table-responsive'>
        <h2>{this.props.name}</h2>
        <table className='table table-striped'>
          <tbody>
            {(this.props.data).map((r,i) => <tr key={i}>
            {(this.props.cols).map(c => <td key={c.key}>{ r[c.key] }</td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  };
};
 
const make_cols = refstr => {
  let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
  for(var i=0; i<C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
  return o;
};

class SheetJSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      data: [],
      cols: []
    };
    this.name = [];
    this.data = [];
    this.cols = [];
    this.handleFile = this.handleFile.bind(this);
    this.show = this.show.bind(this);
  };
  handleFile(file) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e)=> {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
      for (let i=0; i<wb.SheetNames.length; i++) {
        const wsName = wb.SheetNames[i];
        const ws = wb.Sheets[wsName];
        const wsData = XLSX.utils.sheet_to_json(ws, {header:1});
        const wsCols = make_cols(ws['!ref']);

        this.name.push(wsName);
        this.data.push(wsData);
        this.cols.push(wsCols);
      }
      this.setState({name:this.name[0], data:this.data[0], cols:this.cols[0]});
    };
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  };
  show(i) {
    this.setState({name:this.name[i], data:this.data[i], cols:this.cols[i]});
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-12'>
            <DataInput handleFile = {this.handleFile} />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <button disabled={!this.state.data.length} className="btn btn-success" onClick={() => this.show(0)}>{this.name[0]}</button>
            <button disabled={!this.state.data.length} className="btn btn-success" onClick={() => this.show(1)}>{this.name[1]}</button>
            <button disabled={!this.state.data.length} className="btn btn-success" onClick={() => this.show(2)}>{this.name[2]}</button>
            <button disabled={!this.state.data.length} className="btn btn-success" onClick={() => this.show(3)}>{this.name[3]}</button>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <OutTable name={this.state.name} data={this.state.data} cols={this.state.cols} />
          </div>
        </div>
      </div>
    );
  };
}; 

export default SheetJSApp;