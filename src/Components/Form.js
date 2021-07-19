import React from 'react';
import './Form.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Form extends React.Component {

    state = {
        satelliteId: '',
        category: '',
        message: '',
        length: '',
        value: '',
        date: '',
        day: '',
        month: '',
        year: '',
        hours: '',
        minutes: '',
        UTCDay: '',
        UTCMonth: '',
        UTCYear: '',
        UTCHours: '',
        UTCMinutes: '',
        dateTime: '',
        isPending: ''
    };

    // assigns states when user types in field
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

        // auto input based on Satellite ID and category
        if (event.target.name === 'category' && event.target.value === 'SOH') {
            if (this.state.satelliteId === 'Sat1' || this.state.satelliteId === 'Sat2') {
                this.setState({
                    length: '5 min',
                    value: '10'
                }); 
            }
        }

        if (event.target.name === 'category' && event.target.value === 'Commercial') {
            if (this.state.satelliteId === 'Sat1') {
                this.setState({
                    length: '30 min',
                    value: '100'
                });
            }
            if (this.state.satelliteId === 'Sat2') {
                this.setState({
                    length: '30 min',
                    value: '50'
                });
            }
        }

        if (event.target.name === 'category' && event.target.value === 'Good Morning') {
            if (this.state.satelliteId === 'Sat1' || this.state.satelliteId === 'Sat2') {
                this.setState({
                    length: '5 min',
                    value: '0'
                }); 
            }
        }

        if (event.target.name === 'category' && event.target.value === 'TV movie') {
            if (this.state.satelliteId === 'Sat1') {
                this.setState({
                    length: '60 min',
                    value: '150'
                });
            }
            if (this.state.satelliteId === 'Sat2') {
                this.setState({
                    length: '60 min',
                    value: '200'
                });
            }
        }

        if (event.target.name === 'category' && event.target.value === 'TV Show') {
            if (this.state.satelliteId === 'Sat1' || this.state.satelliteId === 'Sat2') {
                this.setState({
                    length: '45 min',
                    value: '100'
                }); 
            }
        }

        if (event.target.name === 'category' && event.target.value === 'Movie') {
            if (this.state.satelliteId === 'Sat1') {
                this.setState({
                    length: '120 min',
                    value: '400'
                });
            }
            if (this.state.satelliteId === 'Sat2') {
                this.setState({
                    length: '120 min',
                    value: '300'
                });
            }
        }

        if (event.target.name === 'satelliteId' && event.target.value === 'Sat1') {
            if (this.state.category === 'SOH') {
                this.setState({
                    length: '5 min',
                    value: '10'
                });
            }
            if (this.state.category === 'Commercial') {
                this.setState({
                    length: '30 min',
                    value: '100'
                });
            }
            if (this.state.category === 'Good Morning') {
                this.setState({
                    length: '5 min',
                    value: '0'
                });
            }
            if (this.state.category === 'TV Movie') {
                this.setState({
                    length: '60 min',
                    value: '150'
                });
            }
            if (this.state.category === 'TV Show') {
                this.setState({
                    length: '5 min',
                    value: '10'
                });
            }
            if (this.state.category === 'Movie') {
                this.setState({
                    length: '120 min',
                    value: '400'
                });
            }
        }

        if (event.target.name === 'satelliteId' && event.target.value === 'Sat2') {
            if (this.state.category === 'SOH') {
                this.setState({
                    length: '5 min',
                    value: '10'
                });
            }
            if (this.state.category === 'Commercial') {
                this.setState({
                    length: '30 min',
                    value: '50'
                });
            }
            if (this.state.category === 'Good Morning') {
                this.setState({
                    length: '5 min',
                    value: '0'
                });
            }
            if (this.state.category === 'TV Movie') {
                this.setState({
                    length: '60 min',
                    value: '200'
                });
            }
            if (this.state.category === 'TV Show') {
                this.setState({
                    length: '5 min',
                    value: '100'
                });
            }
            if (this.state.category === 'Movie') {
                this.setState({
                    length: '120 min',
                    value: '300'
                });
            }
        }
    }

    // assigns different individual date states when user selects a date
    handleDateChange = event => {
        this.setState({
            date: event,
            day: event.getDate(),
            month: event.getMonth() + 1,
            year: event.getFullYear(),
            hours: event.getHours(),
            minutes: event.getMinutes(),

            UTCDay: event.getUTCDate(),
            UTCMonth: event.getUTCMonth() + 1,
            UTCYear: event.getUTCFullYear(),
            UTCHours: event.getUTCHours(),
            UTCMinutes: event.getUTCMinutes(),
        });
    }

    // converts this.state data to JSON data
    handleSubmit = event => {
        event.preventDefault();
        var satelliteId = this.state.satelliteId;
        var category = this.state.category;
        var message = this.state.message;
        var length = this.state.length;
        var value = this.state.value;
        var UTCDay = this.state.UTCDay;
        var UTCMonth = this.state.UTCMonth;
        var UTCYear = this.state.UTCYear;
        var UTCHours = this.state.UTCHours;
        var UTCMinutes = this.state.UTCMinutes;

        const log = { satelliteId, category, message, length, value, UTCDay, UTCMonth, UTCYear, UTCHours, UTCMinutes };

        this.setState({
            isPending: 'true'
        });

        fetch('http://localhost:8000/requests', {
            method: 'POST',                                         // type of request is a post request
            headers: { "Content-Type": "application/json" },        // type of data is JSON data
            body: JSON.stringify(log)                               // turn into JSON data
        }).then(() => {
            this.setState({
                isPending: ''
            });
        }) 
    }

    render() {
        return (
            <div className='submit-fields'>
                <form onSubmit={this.handleSubmit}>
                    <label>Satellite ID</label>
                    <select
                        name='satelliteId'
                        value={this.state.satelliteId}
                        onChange={this.handleChange}
                        className='not-date-picker'
                    >
                        <option value='--'>--</option>
                        <option value='Sat1'>Sat1</option>
                        <option value='Sat2'>Sat2</option>
                    </select>

                    <label>Category</label>
                    <select
                        name='category'
                        value={this.state.category}
                        onChange={this.handleChange}
                        className='not-date-picker'
                    >
                        <option value='--'>--</option>
                        <option value='SOH'>SOH</option>
                        <option value='Commercial'>Commercial</option>
                        <option value='Good Morning'>Good Morning</option>
                        <option value='TV Movie'>TV Movie</option>
                        <option value='TV Show'>TV Show</option>
                        <option value='Movie'>Movie</option>
                    </select>
                    <label>Message</label>
                    <textarea
                        name='message'
                        value={this.state.message}
                        onChange={this.handleChange}
                        className='not-date-picker'
                    />
                    <label>Length</label>
                    <input
                        name='length'
                        value={this.state.length}
                        onChange={this.handleChange}
                        className='not-date-picker'

                    />
                    <label>Value</label>
                    <input
                        name='value'
                        value={this.state.value}
                        onChange={this.handleChange}                        
                        className='not-date-picker'
                    />
                    <DatePicker
                        selected={this.state.date} 
                        onChange={this.handleDateChange}
                        placeholderText={'dd/mm/yyyy'}
                        timeIntervals='15'
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
                        showYearDropdown
                        scrollableYearDropdown
                    />
                    { !this.state.isPending && <button type='submit'>Submit</button>}
                    { this.state.isPending && <button disabled>Adding request</button>}
                </form>
                <button onClick={(event) => {
                    event.preventDefault();
                    this.setState({
                        satelliteId: '',
                        category: '',
                        message: '',
                        length: '',
                        value: '',
                        date: '',
                        day: '',
                        month: '',
                        year: '',
                        hours: '',
                        minutes: '',
                        UTCDay: '',
                        UTCMonth: '',
                        UTCYear: '',
                        UTCHours: '',
                        UTCMinutes: '',
                        dateTime: '',
                        isPending: ''
                    });
                }}>
                    Reset
                </button>
            </div>
        )
    }
}

export default Form;