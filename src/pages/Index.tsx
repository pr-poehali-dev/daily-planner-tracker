import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todayTasks, setTodayTasks] = useState([
    { id: 1, title: 'Утренняя зарядка', completed: false, category: 'Здоровье' },
    { id: 2, title: 'Работа над проектом', completed: false, category: 'Работа' },
    { id: 3, title: 'Прочитать 30 страниц', completed: true, category: 'Обучение' },
    { id: 4, title: 'Позвонить клиенту', completed: false, category: 'Работа' },
  ]);

  const [weekTasks, setWeekTasks] = useState([
    { id: 1, title: 'Подготовить презентацию', day: 'ПН', completed: false },
    { id: 2, title: 'Встреча с командой', day: 'ВТ', completed: true },
    { id: 3, title: 'Сдать отчёт', day: 'СР', completed: false },
    { id: 4, title: 'Тренировка', day: 'ЧТ', completed: false },
    { id: 5, title: 'Планирование недели', day: 'ПТ', completed: false },
  ]);

  const [trackers, setTrackers] = useState([
    { id: 1, name: 'Вода', icon: 'Droplet', current: 6, goal: 8, color: 'bg-blue-500' },
    { id: 2, name: 'Шаги', icon: 'Footprints', current: 7500, goal: 10000, color: 'bg-green-500' },
    { id: 3, name: 'Медитация', icon: 'Heart', current: 15, goal: 20, color: 'bg-purple-500' },
    { id: 4, name: 'Чтение', icon: 'BookOpen', current: 25, goal: 30, color: 'bg-orange-500' },
  ]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const toggleTask = (id: number, isWeekTask: boolean) => {
    if (isWeekTask) {
      setWeekTasks(weekTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } else {
      setTodayTasks(todayTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    }
  };

  const completedToday = todayTasks.filter(t => t.completed).length;
  const completedWeek = weekTasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center space-y-2 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            ПланЛайф
          </h1>
          <p className="text-muted-foreground text-lg">Твой креативный планировщик дня</p>
        </header>

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-14 bg-white/80 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="today" className="flex items-center gap-2">
              <Icon name="Sun" size={18} />
              <span className="hidden sm:inline">Сегодня</span>
            </TabsTrigger>
            <TabsTrigger value="week" className="flex items-center gap-2">
              <Icon name="Calendar" size={18} />
              <span className="hidden sm:inline">Неделя</span>
            </TabsTrigger>
            <TabsTrigger value="trackers" className="flex items-center gap-2">
              <Icon name="Target" size={18} />
              <span className="hidden sm:inline">Трекеры</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Icon name="CalendarDays" size={18} />
              <span className="hidden sm:inline">Календарь</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Icon name="TrendingUp" size={18} />
              <span className="hidden sm:inline">Статистика</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4 animate-slide-up">
            <Card className="border-2 shadow-xl bg-gradient-to-br from-white to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Icon name="CheckCircle2" className="text-primary" />
                    Задачи на сегодня
                  </span>
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {completedToday}/{todayTasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-md group"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id, false)}
                      className="h-6 w-6"
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </p>
                      <Badge variant="outline" className="mt-1">{task.category}</Badge>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4 h-12 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Icon name="Plus" className="mr-2" />
                  Добавить задачу
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="space-y-4 animate-slide-up">
            <Card className="border-2 shadow-xl bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Icon name="CalendarRange" className="text-blue-600" />
                    Планы на неделю
                  </span>
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {completedWeek}/{weekTasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {weekTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-md"
                  >
                    <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1">
                      {task.day}
                    </Badge>
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id, true)}
                      className="h-6 w-6"
                    />
                    <p className={`flex-1 font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </p>
                  </div>
                ))}
                <Button className="w-full mt-4 h-12 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <Icon name="Plus" className="mr-2" />
                  Добавить задачу
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trackers" className="animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trackers.map((tracker) => {
                const percentage = (tracker.current / tracker.goal) * 100;
                return (
                  <Card key={tracker.id} className="border-2 shadow-xl hover:shadow-2xl transition-shadow bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${tracker.color} bg-opacity-20`}>
                          <Icon name={tracker.icon} className={tracker.color.replace('bg-', 'text-')} size={24} />
                        </div>
                        <span>{tracker.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>{tracker.current}</span>
                          <span className="text-muted-foreground">/ {tracker.goal}</span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 rounded-xl">
                          <Icon name="Minus" size={16} />
                        </Button>
                        <Button size="sm" className={`flex-1 rounded-xl ${tracker.color} hover:opacity-90`}>
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <Button className="w-full mt-4 h-12 text-lg rounded-xl bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
              <Icon name="Plus" className="mr-2" />
              Добавить трекер
            </Button>
          </TabsContent>

          <TabsContent value="calendar" className="animate-slide-up">
            <Card className="border-2 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <Button variant="outline" size="icon" className="rounded-xl">
                    <Icon name="ChevronLeft" />
                  </Button>
                  <span className="text-2xl font-display">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </span>
                  <Button variant="outline" size="icon" className="rounded-xl">
                    <Icon name="ChevronRight" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'].map((day) => (
                    <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: startingDayOfWeek }, (_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const isToday = day === new Date().getDate() && 
                                   selectedDate.getMonth() === new Date().getMonth();
                    return (
                      <button
                        key={day}
                        className={`aspect-square rounded-xl p-2 text-center transition-all hover:scale-105 ${
                          isToday
                            ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold shadow-lg'
                            : 'hover:bg-purple-100 border-2 border-transparent hover:border-purple-300'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Target" />
                    Выполнено задач
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold">{completedToday + completedWeek}</p>
                  <p className="text-purple-100 mt-2">за всё время</p>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Flame" />
                    Серия дней
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold">7</p>
                  <p className="text-blue-100 mt-2">дней подряд</p>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-xl bg-gradient-to-br from-orange-600 to-red-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Trophy" />
                    Уровень
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold">12</p>
                  <p className="text-orange-100 mt-2">продуктивности</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" />
                  Активность по категориям
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Работа', value: 75, color: 'bg-purple-500' },
                  { name: 'Здоровье', value: 60, color: 'bg-green-500' },
                  { name: 'Обучение', value: 85, color: 'bg-blue-500' },
                  { name: 'Личное', value: 45, color: 'bg-orange-500' },
                ].map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-muted-foreground">{category.value}%</span>
                    </div>
                    <Progress value={category.value} className={`h-3 ${category.color}`} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
