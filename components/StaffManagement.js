"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Clock,
  CalendarIcon,
  Plus,
  Search,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react";

const initialEmployees = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@hotel.com",
    phone: "+1-555-0101",
    address: "123 Main St, City",
    position: "Head Chef",
    department: "Kitchen",
    hourlyRate: 28.5,
    hireDate: new Date("2023-03-15"),
    status: "active",
    emergencyContact: {
      name: "Jane Smith",
      phone: "+1-555-0102",
      relationship: "Spouse",
    },
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@hotel.com",
    phone: "+1-555-0103",
    address: "456 Oak Ave, City",
    position: "Front Desk Manager",
    department: "Hotel",
    hourlyRate: 22.0,
    hireDate: new Date("2023-01-20"),
    status: "active",
    emergencyContact: {
      name: "Mike Johnson",
      phone: "+1-555-0104",
      relationship: "Brother",
    },
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Wilson",
    email: "mike.w@hotel.com",
    phone: "+1-555-0105",
    address: "789 Pine St, City",
    position: "Server",
    department: "Restaurant",
    hourlyRate: 15.5,
    hireDate: new Date("2023-06-10"),
    status: "active",
    emergencyContact: {
      name: "Lisa Wilson",
      phone: "+1-555-0106",
      relationship: "Mother",
    },
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.d@hotel.com",
    phone: "+1-555-0107",
    address: "321 Elm St, City",
    position: "Housekeeper",
    department: "Housekeeping",
    hourlyRate: 16.0,
    hireDate: new Date("2023-04-05"),
    status: "on-leave",
    emergencyContact: {
      name: "Tom Davis",
      phone: "+1-555-0108",
      relationship: "Husband",
    },
  },
];

const initialShifts = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "John Smith",
    department: "Kitchen",
    date: new Date(),
    startTime: "06:00",
    endTime: "14:00",
    status: "in-progress",
    hoursWorked: 6,
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Sarah Johnson",
    department: "Hotel",
    date: new Date(),
    startTime: "08:00",
    endTime: "16:00",
    status: "scheduled",
  },
  {
    id: "3",
    employeeId: "3",
    employeeName: "Mike Wilson",
    department: "Restaurant",
    date: new Date(),
    startTime: "17:00",
    endTime: "23:00",
    status: "scheduled",
  },
];

const StaffManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [shifts, setShifts] = useState(initialShifts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNewEmployeeOpen, setIsNewEmployeeOpen] = useState(false);
  const [isNewShiftOpen, setIsNewShiftOpen] = useState(false);

  const departments = [
    "all",
    "Restaurant",
    "Hotel",
    "Housekeeping",
    "Management",
    "Kitchen",
  ];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" ||
      employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const todayShifts = shifts.filter((shift) => {
    const today = new Date();
    return (
      shift.date.toDateString() === today.toDateString() ||
      shift.date.toDateString() === selectedDate.toDateString()
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "secondary";
      case "inactive":
        return "outline";
      case "on-leave":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getShiftStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "outline";
      case "in-progress":
        return "secondary";
      case "completed":
        return "default";
      case "missed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getShiftStatusIcon = (status) => {
    switch (status) {
      case "scheduled":
        return <Clock className='w-4 h-4' />;
      case "in-progress":
        return <AlertCircle className='w-4 h-4' />;
      case "completed":
        return <CheckCircle className='w-4 h-4' />;
      case "missed":
        return <XCircle className='w-4 h-4' />;
      default:
        return <Clock className='w-4 h-4' />;
    }
  };

  const updateShiftStatus = (shiftId, newStatus) => {
    setShifts((prev) =>
      prev.map((shift) =>
        shift.id === shiftId ? { ...shift, status: newStatus } : shift
      )
    );
  };

  const clockIn = (employeeId) => {
    const shift = shifts.find(
      (s) => s.employeeId === employeeId && s.status === "scheduled"
    );
    if (shift) {
      updateShiftStatus(shift.id, "in-progress");
    }
  };

  const clockOut = (employeeId) => {
    const shift = shifts.find(
      (s) => s.employeeId === employeeId && s.status === "in-progress"
    );
    if (shift) {
      updateShiftStatus(shift.id, "completed");
    }
  };

  const activeEmployees = employees.filter(
    (emp) => emp.status === "active"
  ).length;
  const onDutyToday = todayShifts.filter(
    (shift) => shift.status === "in-progress"
  ).length;
  const totalPayroll = employees
    .filter((emp) => emp.status === "active")
    .reduce((sum, emp) => sum + emp.hourlyRate * 40, 0); // Assuming 40 hours per week

  return (
    <div className='space-y-6'>
      {/* Staff Overview Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Employees
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{employees.length}</div>
            <p className='text-xs text-muted-foreground'>
              {activeEmployees} active employees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>On Duty Today</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{onDutyToday}</div>
            <p className='text-xs text-muted-foreground'>Currently working</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Scheduled Shifts
            </CardTitle>
            <CalendarIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{todayShifts.length}</div>
            <p className='text-xs text-muted-foreground'>For today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Weekly Payroll
            </CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${totalPayroll.toFixed(0)}</div>
            <p className='text-xs text-muted-foreground'>
              Estimated weekly cost
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue='employees'
        className='space-y-4'>
        <TabsList>
          <TabsTrigger value='employees'>Employees</TabsTrigger>
          <TabsTrigger value='schedule'>Schedule</TabsTrigger>
          <TabsTrigger value='attendance'>Attendance</TabsTrigger>
          <TabsTrigger value='payroll'>Payroll</TabsTrigger>
        </TabsList>

        <TabsContent
          value='employees'
          className='space-y-4'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Employee Directory</CardTitle>
                <div className='flex items-center gap-2'>
                  <div className='relative'>
                    <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      placeholder='Search employees...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='pl-8 w-48'
                    />
                  </div>
                  <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}>
                    <SelectTrigger className='w-40'>
                      <SelectValue placeholder='Department' />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem
                          key={dept}
                          value={dept}>
                          {dept.charAt(0).toUpperCase() + dept.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog
                    open={isNewEmployeeOpen}
                    onOpenChange={setIsNewEmployeeOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className='w-4 h-4 mr-2' />
                        Add Employee
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                      <DialogHeader>
                        <DialogTitle>Add New Employee</DialogTitle>
                      </DialogHeader>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <Label htmlFor='firstName'>First Name</Label>
                          <Input
                            id='firstName'
                            placeholder='John'
                          />
                        </div>
                        <div>
                          <Label htmlFor='lastName'>Last Name</Label>
                          <Input
                            id='lastName'
                            placeholder='Smith'
                          />
                        </div>
                        <div>
                          <Label htmlFor='email'>Email</Label>
                          <Input
                            id='email'
                            type='email'
                            placeholder='john@hotel.com'
                          />
                        </div>
                        <div>
                          <Label htmlFor='phone'>Phone</Label>
                          <Input
                            id='phone'
                            placeholder='+1-555-0123'
                          />
                        </div>
                        <div>
                          <Label htmlFor='position'>Position</Label>
                          <Input
                            id='position'
                            placeholder='Server'
                          />
                        </div>
                        <div>
                          <Label htmlFor='department'>Department</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder='Select department' />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.slice(1).map((dept) => (
                                <SelectItem
                                  key={dept}
                                  value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor='hourlyRate'>Hourly Rate ($)</Label>
                          <Input
                            id='hourlyRate'
                            type='number'
                            step='0.01'
                            placeholder='15.00'
                          />
                        </div>
                        <div>
                          <Label htmlFor='hireDate'>Hire Date</Label>
                          <Input
                            id='hireDate'
                            type='date'
                          />
                        </div>
                        <div className='col-span-2'>
                          <Label htmlFor='address'>Address</Label>
                          <Input
                            id='address'
                            placeholder='123 Main St, City, State'
                          />
                        </div>
                      </div>
                      <Button className='w-full mt-4'>Add Employee</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {filteredEmployees.map((employee) => (
                  <Card key={employee.id}>
                    <CardContent className='p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                          <Avatar className='h-12 w-12'>
                            <AvatarImage
                              src={employee.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {employee.firstName[0]}
                              {employee.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h3 className='font-semibold'>
                                {employee.firstName} {employee.lastName}
                              </h3>
                              <Badge variant={getStatusColor(employee.status)}>
                                {employee.status}
                              </Badge>
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground'>
                              <div>
                                <p>Position: {employee.position}</p>
                              </div>
                              <div>
                                <p>Department: {employee.department}</p>
                              </div>
                              <div>
                                <p>Rate: ${employee.hourlyRate}/hr</p>
                              </div>
                              <div>
                                <p>
                                  Hired:{" "}
                                  {employee.hireDate.toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Button
                            size='sm'
                            variant='outline'>
                            <Phone className='w-4 h-4 mr-1' />
                            Call
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'>
                            <Mail className='w-4 h-4 mr-1' />
                            Email
                          </Button>
                          {employee.status === "active" && (
                            <>
                              <Button
                                size='sm'
                                onClick={() => clockIn(employee.id)}>
                                Clock In
                              </Button>
                              <Button
                                size='sm'
                                variant='secondary'
                                onClick={() => clockOut(employee.id)}>
                                Clock Out
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value='schedule'
          className='space-y-4'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Staff Schedule</CardTitle>
                <div className='flex items-center gap-2'>
                  <Input
                    type='date'
                    value={selectedDate.toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  />
                  <Dialog
                    open={isNewShiftOpen}
                    onOpenChange={setIsNewShiftOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className='w-4 h-4 mr-2' />
                        Schedule Shift
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Schedule New Shift</DialogTitle>
                      </DialogHeader>
                      <div className='space-y-4'>
                        <div>
                          <Label htmlFor='employee'>Employee</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder='Select employee' />
                            </SelectTrigger>
                            <SelectContent>
                              {employees
                                .filter((emp) => emp.status === "active")
                                .map((employee) => (
                                  <SelectItem
                                    key={employee.id}
                                    value={employee.id}>
                                    {employee.firstName} {employee.lastName} -{" "}
                                    {employee.position}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor='shiftDate'>Date</Label>
                          <Input
                            id='shiftDate'
                            type='date'
                          />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                          <div>
                            <Label htmlFor='startTime'>Start Time</Label>
                            <Input
                              id='startTime'
                              type='time'
                            />
                          </div>
                          <div>
                            <Label htmlFor='endTime'>End Time</Label>
                            <Input
                              id='endTime'
                              type='time'
                            />
                          </div>
                        </div>
                        <Button className='w-full'>Schedule Shift</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {todayShifts.map((shift) => (
                  <Card key={shift.id}>
                    <CardContent className='p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                          <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                            <Users className='w-6 h-6' />
                          </div>
                          <div>
                            <div className='flex items-center gap-2 mb-1'>
                              <h3 className='font-semibold'>
                                {shift.employeeName}
                              </h3>
                              <Badge variant='outline'>
                                {shift.department}
                              </Badge>
                              <Badge
                                variant={getShiftStatusColor(shift.status)}
                                className='flex items-center gap-1'>
                                {getShiftStatusIcon(shift.status)}
                                {shift.status}
                              </Badge>
                            </div>
                            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                              <span>
                                {shift.startTime} - {shift.endTime}
                              </span>
                              <span>{shift.date.toLocaleDateString()}</span>
                              {shift.hoursWorked && (
                                <span>{shift.hoursWorked} hours worked</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          {shift.status === "scheduled" && (
                            <Button
                              size='sm'
                              onClick={() =>
                                updateShiftStatus(shift.id, "in-progress")
                              }>
                              Start Shift
                            </Button>
                          )}
                          {shift.status === "in-progress" && (
                            <Button
                              size='sm'
                              variant='secondary'
                              onClick={() =>
                                updateShiftStatus(shift.id, "completed")
                              }>
                              End Shift
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {todayShifts.length === 0 && (
                  <p className='text-center text-muted-foreground py-8'>
                    No shifts scheduled for this date
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value='attendance'
          className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Attendance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {employees
                  .filter((emp) => emp.status === "active")
                  .map((employee) => {
                    const todayShift = todayShifts.find(
                      (shift) => shift.employeeId === employee.id
                    );
                    return (
                      <Card key={employee.id}>
                        <CardContent className='p-4'>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                              <Avatar className='h-10 w-10'>
                                <AvatarFallback>
                                  {employee.firstName[0]}
                                  {employee.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className='font-semibold'>
                                  {employee.firstName} {employee.lastName}
                                </h3>
                                <p className='text-sm text-muted-foreground'>
                                  {employee.position}
                                </p>
                              </div>
                            </div>
                            <div className='flex items-center gap-4'>
                              {todayShift ? (
                                <div className='text-sm'>
                                  <p>
                                    Scheduled: {todayShift.startTime} -{" "}
                                    {todayShift.endTime}
                                  </p>
                                  <Badge
                                    variant={getShiftStatusColor(
                                      todayShift.status
                                    )}>
                                    {todayShift.status}
                                  </Badge>
                                </div>
                              ) : (
                                <Badge variant='outline'>Not scheduled</Badge>
                              )}
                              <div className='flex gap-2'>
                                <Button
                                  size='sm'
                                  variant='outline'>
                                  View History
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value='payroll'
          className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Payroll Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {employees
                  .filter((emp) => emp.status === "active")
                  .map((employee) => (
                    <Card key={employee.id}>
                      <CardContent className='p-4'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-4'>
                            <Avatar className='h-10 w-10'>
                              <AvatarFallback>
                                {employee.firstName[0]}
                                {employee.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className='font-semibold'>
                                {employee.firstName} {employee.lastName}
                              </h3>
                              <p className='text-sm text-muted-foreground'>
                                {employee.position}
                              </p>
                            </div>
                          </div>
                          <div className='text-right'>
                            <div className='grid grid-cols-3 gap-4 text-sm'>
                              <div>
                                <p className='text-muted-foreground'>
                                  Hourly Rate
                                </p>
                                <p className='font-semibold'>
                                  ${employee.hourlyRate}
                                </p>
                              </div>
                              <div>
                                <p className='text-muted-foreground'>
                                  Hours This Week
                                </p>
                                <p className='font-semibold'>32</p>
                              </div>
                              <div>
                                <p className='text-muted-foreground'>
                                  Weekly Pay
                                </p>
                                <p className='font-semibold'>
                                  ${(employee.hourlyRate * 32).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffManagement;
